'use strict';

var IdentifierMap = require('./helper/identifier-map.js').IdentifierMap,
    scheduledIntervalFunctions,
    scheduledTimeoutFunctions,
    worker = new Worker('./worker/timing-worker.js');

scheduledIntervalFunctions = new IdentifierMap();
scheduledTimeoutFunctions = new IdentifierMap();

worker.addEventListener('message', function (event) {
    var data,
        func,
        id,
        type;

    data = event.data;
    id = data.id;
    type = data.type;

    if (type === 'interval') {
        func = scheduledIntervalFunctions.get(id);

        if (func) {
            func();
        }
    } else { // type === 'timeout'
        func = scheduledTimeoutFunctions.get(id);

        if (func) {
            func();

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
    var id = scheduledIntervalFunctions.set(function () {
            func();

            setInterval(func, delay);
        });

    worker.postMessage({
        action: 'set',
        delay: delay,
        id: id,
        now: performance.now(),
        type: 'interval'
    });

    return id;
}

function setTimeout(func, delay) {
    var id = scheduledTimeoutFunctions.set(func);

    worker.postMessage({
        action: 'set',
        delay: delay,
        id: id,
        now: performance.now(),
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
