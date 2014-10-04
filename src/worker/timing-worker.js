'use strict';

var IdentifierMap = require('./../helper/identifier-map.js').IdentifierMap,
    scheduledIntervalIdentifiers,
    scheduledTimeoutIdentifiers;

scheduledIntervalIdentifiers = new IdentifierMap();
scheduledTimeoutIdentifiers = new IdentifierMap();

self.addEventListener('message', function (event) {
    var action,
        data,
        delay,
        id,
        identifier,
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

        data = {
            id: id,
            type: type
        };

        if (type === 'interval') {
            scheduledIntervalIdentifiers.set(id, setInterval(function () {
                self.postMessage(data);
            }, delay));
        } else { // type === 'timeout'
            scheduledTimeoutIdentifiers.set(id, setTimeout(function () {
                self.postMessage(data);
            }, delay));
        }
    }
});
