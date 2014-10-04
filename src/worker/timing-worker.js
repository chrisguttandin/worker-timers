'use strict';

var scheduledIntervalIds = new Map(),
    scheduledTimeoutIds = new Map();

self.addEventListener('message', function (event) {
    var action,
        data,
        delay,
        id,
        type;

    data = event.data;
    action = data.action;
    id = data.id;
    type = data.type;

    if (action === 'clear') {
        if (type === 'interval') {
            if (scheduledIntervalIds.has(id)) {
                clearInterval(scheduledIntervalIds.get(id));
                scheduledIntervalIds.delete(id);
            }
        } else { // type === 'timeout'
            if (scheduledTimeoutIds.has(id)) {
                clearTimeout(scheduledTimeoutIds.get(id));
                scheduledTimeoutIds.delete(id);
            }
        }
    } else { // action === 'set'
        delay = data.delay;

        data = {
            id: id,
            type: type
        };

        if (type === 'interval') {
            scheduledIntervalIds.set(id, setInterval(function () {
                self.postMessage(data);
            }, delay));
        } else { // type === 'timeout'
            scheduledTimeoutIds.set(id, setTimeout(function () {
                self.postMessage(data);
            }, delay));
        }
    }
});
