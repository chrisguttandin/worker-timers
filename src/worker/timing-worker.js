import { IdentifierMap } from './../helper/identifier-map';

const scheduledIntervalIdentifiers = new IdentifierMap();
const scheduledTimeoutIdentifiers = new IdentifierMap();

const setTimeoutCallback = (identifiers, id, expected, data) => {
    var now = ('performance' in self) ? performance.now() : Date.now();

    if (now > expected) {
        self.postMessage(data);
    } else {
        identifiers.set(id, setTimeout(setTimeoutCallback, (expected - now), identifiers, id, expected, data));
    }
};

export default (self) => {
    self.addEventListener('message', ({ data: { action, delay, id, now: nowInMainThread, type } }) => {
        if (action === 'clear') {
            let identifier;

            if (type === 'interval') {
                identifier = scheduledIntervalIdentifiers.get(id);

                if (identifier !== undefined) {
                    clearTimeout(identifier);
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
            let expected,
                now;

            if ('performance' in self) {
                let elapsed,
                    nowInWorker;

                nowInWorker = performance.now();
                elapsed = Math.max(0, nowInWorker - nowInMainThread);

                delay -= elapsed;
                now = nowInWorker;
            } else {
                now = Date.now();
            }

            expected = now + delay;

            if (type === 'interval') {
                scheduledIntervalIdentifiers.set(id, setTimeout(setTimeoutCallback, delay, scheduledIntervalIdentifiers, id, expected, { id, type }));
            } else { // type === 'timeout'
                scheduledTimeoutIdentifiers.set(id, setTimeout(setTimeoutCallback, delay, scheduledTimeoutIdentifiers, id, expected, { id, type }));
            }
        }
    });
};
