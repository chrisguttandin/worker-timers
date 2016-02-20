'use strict';

var workerTimers = require('../../src/worker-timers.js');

describe('workerTimers', function () {

    describe('clearInterval()', function () {

        it('should not call the function after clearing the interval', function (done) {
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

        var id;

        afterEach(function () {
            workerTimers.clearTimeout(id);
        });

        it('should return a numeric id', function () {
            id = workerTimers.setInterval(function () {}, 0);

            expect(id).to.be.a('number');
        });

        it('should constantly call a function with the given delay', function (done) {
            var before = window.performance.now(),
                calls = 0;

            function func() {
                var elapsed,
                    now;

                now = window.performance.now();
                elapsed = now - before;

                expect(elapsed).to.be.at.least(100);

                if (calls > 4) { // test five calls
                    done();
                }

                before = now;
                calls += 1;
            }

            id = workerTimers.setInterval(func, 100);
        });

    });

    describe('setTimeout()', function () {

        var id;

        afterEach(function () {
            workerTimers.clearInterval(id);
        });

        it('should return a numeric id', function () {
            id = workerTimers.setTimeout(function () {}, 0);

            expect(id).to.be.a('number');
        });

        it('should postpone a function for the given delay', function (done) {
            var before = window.performance.now();

            function func() {
                var elapsed = window.performance.now() - before;

                expect(elapsed).to.be.at.least(100);

                done();
            }

            id = workerTimers.setTimeout(func, 100);
        });

    });

});
