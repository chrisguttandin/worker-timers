'use strict';

var lastIntervalId = -1,
    lastTimeoutId = -1,
    scheduledIntervalFunctions = new Map(),
    scheduledTimeoutFunctions = new Map(),
    worker = new Worker('./worker/timing-worker.js');

worker.addEventListener('message', function (event) {
    var data,
        id,
        type;

    data = event.data;
    id = data.id;
    type = data.type;

    if (type === 'interval') {
        if (scheduledIntervalFunctions.has(id)) {
            scheduledIntervalFunctions.get(id)();
        }
    } else { // type === 'timeout'
        if (scheduledTimeoutFunctions.has(id)) {
            scheduledTimeoutFunctions.get(id)();

            // a timeout can be savely deleted because it is only called once
            scheduledTimeoutFunctions.delete(id);
        }
    }
});

function clearInterval(id) {
    scheduledIntervalFunctions.delete(id);

    worker.postMessage({
        action: 'clear',
        id: id,
        type: 'interval'
    });
}

function clearTimeout(id) {
    scheduledTimeoutFunctions.delete(id);

    worker.postMessage({
        action: 'clear',
        id: id,
        type: 'timeout'
    });
}

function setInterval(func, delay) {
    var id;

    lastIntervalId += 1;
    id = lastIntervalId;

    scheduledIntervalFunctions.set(id, func);

    worker.postMessage({
        action: 'set',
        delay: delay,
        id: id,
        type: 'interval'
    });

    return id;
}

function setTimeout(func, delay) {
    var id;

    lastTimeoutId += 1;
    id = lastTimeoutId;

    scheduledTimeoutFunctions.set(id, func);

    worker.postMessage({
        action: 'set',
        delay: delay,
        id: id,
        type: 'timeout'
    });

    return id;
}

module.exports = {
    clearInterval: clearInterval,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    setTimeout: setTimeout
};
