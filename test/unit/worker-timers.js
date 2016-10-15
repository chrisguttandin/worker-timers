import * as workerTimers from '../../src/worker-timers';

describe('workerTimers', () => {

    describe('clearInterval()', () => {

        it('should not call the function after clearing the interval', (done) => {
            /* eslint-disable indent */
            var id = workerTimers.setInterval(() => {
                    throw 'this should never be called';
                }, 100);
            /* eslint-enable indent */

            workerTimers.clearInterval(id);

            // Wait 200ms to be sure the function never gets called.
            setTimeout(done, 200);
        });

        it('should not call the function anymore after clearing the interval after the first callback', (done) => {
            /* eslint-disable indent */
            var id = workerTimers.setInterval(() => {
                    if (id === null) {
                        throw 'this should never be called';
                    }

                    workerTimers.clearInterval(id);
                    id = null;
                }, 50);
            /* eslint-enable indent */

            // Wait 200ms to be sure the function gets not called anymore.
            setTimeout(done, 200);
        });

    });

    describe('clearTimeout()', () => {

        it('should not call the function after clearing the timeout', (done) => {
            /* eslint-disable indent */
            var id = workerTimers.setTimeout(() => {
                    throw 'this should never be called';
                }, 100);
            /* eslint-enable indent */

            workerTimers.clearTimeout(id);

            // Wait 200ms to be sure the function never gets called.
            setTimeout(done, 200);
        });

    });

    describe('setInterval()', () => {

        var id;

        afterEach(() => {
            workerTimers.clearTimeout(id);
        });

        it('should return a numeric id', () => {
            id = workerTimers.setInterval(() => {}, 0);

            expect(id).to.be.a('number');
        });

        it('should constantly call a function with the given delay', (done) => {
            var before = performance.now(),
                calls = 0;

            function func () {
                var elapsed,
                    now;

                now = performance.now();
                elapsed = now - before;

                expect(elapsed).to.be.at.least(100);

                // Test five calls.
                if (calls > 4) {
                    done();
                }

                before = now;
                calls += 1;
            }

            id = workerTimers.setInterval(func, 100);
        });

    });

    describe('setTimeout()', () => {

        var id;

        afterEach(() => {
            workerTimers.clearInterval(id);
        });

        it('should return a numeric id', () => {
            id = workerTimers.setTimeout(() => {}, 0);

            expect(id).to.be.a('number');
        });

        it('should postpone a function for the given delay', (done) => {
            var before = performance.now();

            function func () {
                var elapsed = performance.now() - before;

                expect(elapsed).to.be.at.least(100);

                done();
            }

            id = workerTimers.setTimeout(func, 100);
        });

    });

});
