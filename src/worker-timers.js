import { IdentifierMap } from './helper/identifier-map';
import timingWorker from './worker/timing-worker';
import webworkify from 'webworkify';

const worker = webworkify(timingWorker);

const scheduledIntervalFunctions = new IdentifierMap();
const scheduledTimeoutFunctions = new IdentifierMap();

worker.addEventListener('message', ({ data: { id, type } }) => {
    var func;

    if (type === 'interval') {
        func = scheduledIntervalFunctions.get(id);

        if (func) {
            func();
        }

    // type === 'timeout'
    } else {
        func = scheduledTimeoutFunctions.get(id);

        if (func) {
            func();

            // a timeout can be savely deleted because it is only called once
            scheduledTimeoutFunctions.delete(id);
        }
    }
});

export const clearInterval = (id) => {
    scheduledIntervalFunctions.delete(id);

    worker.postMessage({
        action: 'clear',
        id,
        type: 'interval'
    });
};

export const clearTimeout = (id) => {
    scheduledTimeoutFunctions.delete(id);

    worker.postMessage({
        action: 'clear',
        id,
        type: 'timeout'
    });
};

export const setInterval = (func, delay) => {
    /* eslint-disable indent */
    var id = scheduledIntervalFunctions.set(() => {
            func();

            worker.postMessage({
                action: 'set',
                delay,
                id,
                now: performance.now(),
                type: 'interval'
            });
        });
    /* eslint-enable indent */

    worker.postMessage({
        action: 'set',
        delay,
        id,
        now: performance.now(),
        type: 'interval'
    });

    return id;
};

export const setTimeout = (func, delay) => {
    var id = scheduledTimeoutFunctions.set(func);

    worker.postMessage({
        action: 'set',
        delay,
        id,
        now: performance.now(),
        type: 'timeout'
    });

    return id;
};
