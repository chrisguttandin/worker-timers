import * as workerTimers from '../../src/module';

describe('module', () => {

    describe('clearInterval()', () => {

        it('should not call the function after clearing the interval', (done) => {
            const id = workerTimers.setInterval(() => {
                done(new Error('This should never be called.'));
            }, 100);

            workerTimers.clearInterval(id);

            // Wait 200ms to be sure the function never gets called.
            setTimeout(done, 200);
        });

        it('should not call the function anymore after clearing the interval after the first callback', (done) => {
            let id = workerTimers.setInterval(() => {
                if (id === null) {
                    done(new Error('This should never be called.'));
                }

                workerTimers.clearInterval(id);
                id = null;
            }, 50);

            // Wait 200ms to be sure the function gets not called anymore.
            setTimeout(done, 200);
        });

    });

    describe('clearTimeout()', () => {

        it('should not call the function after clearing the timeout', (done) => {
            const id = workerTimers.setTimeout(() => {
                done(new Error('This should never be called.'));
            }, 100);

            workerTimers.clearTimeout(id);

            // Wait 200ms to be sure the function never gets called.
            setTimeout(done, 200);
        });

    });

    describe('setInterval()', () => {

        let id;

        afterEach(() => {
            workerTimers.clearInterval(id);
        });

        it('should return a numeric id', () => {
            id = workerTimers.setInterval(() => {}, 0);

            expect(id).to.be.a('number');
        });

        it('should return a value which is greater than zero', () => {
            id = workerTimers.setInterval(() => {}, 0);

            expect(id).to.be.above(0);
        });

        it('should constantly call a function with the given delay', function (done) {
            this.timeout(4000);

            let before = performance.now();
            let calls = 0;

            function func () {
                const now = performance.now();
                const elapsed = now - before;

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

        let id;

        afterEach(() => {
            workerTimers.clearTimeout(id);
        });

        it('should return a numeric id', () => {
            id = workerTimers.setTimeout(() => {}, 0);

            expect(id).to.be.a('number');
        });

        it('should return a value which is greater than zero', () => {
            id = workerTimers.setTimeout(() => {}, 0);

            expect(id).to.be.above(0);
        });

        it('should postpone a function for the given delay', (done) => {
            const before = performance.now();

            function func () {
                const elapsed = performance.now() - before;

                expect(elapsed).to.be.at.least(100);

                done();
            }

            id = workerTimers.setTimeout(func, 100);
        });

    });

});
