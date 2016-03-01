'use strict';

var IdentifierMap = require('./../helper/identifier-map.js').IdentifierMap,
    scheduledIntervalIdentifiers,
    scheduledTimeoutIdentifiers;

scheduledIntervalIdentifiers = new IdentifierMap();
scheduledTimeoutIdentifiers = new IdentifierMap();

function setTimeoutCallback (identifiers, id, expected, data) {
    var now = performance.now(); // eslint-disable-line no-undef

    if (now > expected) {
        self.postMessage(data); // eslint-disable-line no-undef
    } else {
        identifiers.set(id, setTimeout(setTimeoutCallback, (expected - now), identifiers, id, expected, data));
    }
}

self.addEventListener('message', function (event) { // eslint-disable-line no-undef
    var action,
        data,
        delay,
        elapsed,
        expected,
        id,
        identifier,
        now,
        type;

    data = event.data;
    action = data.action;
    id = data.id;
    type = data.type;

    if (action === 'clear') {
        if (type === 'interval') {
            identifier = scheduledIntervalIdentifiers.get(id);

            if (identifier !== undefined) {
                clearInterval(identifier);
                scheduledIntervalIdentifiers.delete(id);
            }
        } else { // type === 'timeout'
            identifier = scheduledTimeoutIdentifiers.get(id);

            if (identifier !== undefined) {
                clearTimeout(identifier);
                scheduledTimeoutIdentifiers.delete(id);
            }
        }
    } else { // action === 'set'
        delay = data.delay;
        now = performance.now(); // eslint-disable-line no-undef
        elapsed = now - data.now;

        if (elapsed > 0) {
            delay -= elapsed;
        }

        expected = now + delay;

        data = {
            id: id,
            type: type
        };

        if (type === 'interval') {
            scheduledIntervalIdentifiers.set(id, setTimeout(setTimeoutCallback, delay, scheduledIntervalIdentifiers, id, expected, data));
        } else { // type === 'timeout'
            scheduledTimeoutIdentifiers.set(id, setTimeout(setTimeoutCallback, delay, scheduledTimeoutIdentifiers, id, expected, data));
        }
    }
});
