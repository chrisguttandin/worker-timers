'use strict';

var workerTimers = require('../../src/worker-timers.js');

describe('workerTimers', function () {

    describe('clearInterval()', function () {

        it('should not call the function after clearing the timeout', function (done) {
            var id = workerTimers.setInterval(function () {
                    throw 'this should never be called';
                }, 100);

            workerTimers.clearInterval(id);

            setTimeout(done, 200); // wait 200ms to be sure the function never gets called
        });
    });

    describe('clearTimeout()', function () {

        it('should not call the function after clearing the timeout', function (done) {
            var id = workerTimers.setTimeout(function () {
                    throw 'this should never be called';
                }, 100);

            workerTimers.clearTimeout(id);

            setTimeout(done, 200); // wait 200ms to be sure the function never gets called
        });
    });

    describe('setInterval()', function () {

        it('should return a numeric id', function () {
            var id = workerTimers.setInterval(function () {}, 0);

            expect(id).to.be.a('number');
        });

        it('should constantly call a function for the given delay', function (done) {
            var calls = 0,
                before = window.performance.now();

            function func() {
                var elapsed = window.performance.now() - before;

                calls += 1;

                expect(elapsed).to.be.closeTo(100 * calls, 10);

                if (calls > 4) { // test five calls
                    done();
                }
            }

            workerTimers.setInterval(func, 100);
        });

    });

    describe('setTimeout()', function () {

        it('should return a numeric id', function () {
            var id = workerTimers.setTimeout(function () {}, 0);

            expect(id).to.be.a('number');
        });

        it('should postpone a function for the given delay', function (done) {
            var before = window.performance.now();

            workerTimers.setTimeout(function () {
                var elapsed = window.performance.now() - before;

                expect(elapsed).to.be.closeTo(100, 10);

                done();
            }, 100);
        });

    });

});
