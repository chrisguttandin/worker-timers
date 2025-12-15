import { afterEach, describe, expect, it } from 'vitest';
import { clearInterval, clearTimeout, setInterval, setTimeout } from '../../src/module';

describe('module', () => {
    describe('clearInterval()', () => {
        it('should be a function', () => {
            expect(clearInterval).to.be.a('function');
        });

        if (typeof window !== 'undefined') {
            it('should not call the function after clearing the interval', () => {
                const { promise, reject, resolve } = Promise.withResolvers();
                const id = setInterval(() => {
                    reject(new Error('This should never be called.'));
                }, 100);

                clearInterval(id);

                // Wait 200ms to be sure the function never gets called.
                window.setTimeout(resolve, 200);

                return promise;
            });

            it('should not call the function anymore after clearing the interval after the first callback', () => {
                const { promise, reject, resolve } = Promise.withResolvers();

                let id = setInterval(() => {
                    if (id === null) {
                        reject(new Error('This should never be called.'));
                    }

                    clearInterval(id);
                    id = null;
                }, 50);

                // Wait 200ms to be sure the function gets not called anymore.
                window.setTimeout(resolve, 200);

                return promise;
            });
        }
    });

    describe('clearTimeout()', () => {
        it('should be a function', () => {
            expect(clearTimeout).to.be.a('function');
        });

        if (typeof window !== 'undefined') {
            it('should not call the function after clearing the timeout', () => {
                const { promise, reject, resolve } = Promise.withResolvers();
                const id = setTimeout(() => {
                    reject(new Error('This should never be called.'));
                }, 100);

                clearTimeout(id);

                // Wait 200ms to be sure the function never gets called.
                window.setTimeout(resolve, 200);

                return promise;
            });
        }
    });

    describe('setInterval()', () => {
        it('should be a function', () => {
            expect(setInterval).to.be.a('function');
        });

        if (typeof window !== 'undefined') {
            describe('when running in a browser', () => {
                let id;

                afterEach(() => {
                    clearInterval(id);
                });

                it('should return a numeric id', () => {
                    id = setInterval(() => {}, 0);

                    expect(id).to.be.a('number');
                });

                it('should return a value which is greater than zero', () => {
                    id = setInterval(() => {}, 0);

                    expect(id).to.be.above(0);
                });

                it('should constantly call a function with the given delay', () => {
                    const { promise, resolve } = Promise.withResolvers();

                    let before = performance.now();
                    let calls = 0;

                    function func() {
                        const now = performance.now();
                        const elapsed = now - before;

                        expect(elapsed).to.be.at.least(100);

                        // Test five calls.
                        if (calls > 4) {
                            resolve();
                        }

                        before = now;
                        calls += 1;
                    }

                    id = setInterval(func, 100);

                    return promise;
                });
            });
        }
    });

    describe('setTimeout()', () => {
        it('should be a function', () => {
            expect(setTimeout).to.be.a('function');
        });

        if (typeof window !== 'undefined') {
            describe('when running in a browser', () => {
                let id;

                afterEach(() => {
                    clearTimeout(id);
                });

                it('should return a numeric id', () => {
                    id = setTimeout(() => {}, 0);

                    expect(id).to.be.a('number');
                });

                it('should return a value which is greater than zero', () => {
                    id = setTimeout(() => {}, 0);

                    expect(id).to.be.above(0);
                });

                it('should postpone a function for the given delay', () => {
                    const { promise, resolve } = Promise.withResolvers();
                    const before = performance.now();

                    function func() {
                        const elapsed = performance.now() - before;

                        expect(elapsed).to.be.at.least(100);

                        resolve();
                    }

                    id = setTimeout(func, 100);

                    return promise;
                });
            });
        }
    });
});
