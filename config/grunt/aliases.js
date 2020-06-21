const { env } = require('process');

// eslint-disable-next-line padding-line-between-statements
const filter = (predicate, ...tasks) => (predicate ? tasks : []);
const isTarget = (...targets) => env.TARGET === undefined || targets.includes(env.TARGET);
const isType = (...types) => env.TYPE === undefined || types.includes(env.TYPE);

module.exports = {
    build: ['clean:build', 'webpack', 'replace:worker', 'sh:build-es2019', 'sh:build-es5'],
    lint: ['sh:lint-config', 'sh:lint-src', 'sh:lint-test'],
    test: [
        'build',
        ...filter(isType('expectation'), ...filter(isTarget('edge'), 'sh:test-expectation-edge')),
        ...filter(isType('integration'), ...filter(isTarget('chrome', 'edge', 'firefox', 'safari'), 'sh:test-integration'))
    ]
};
