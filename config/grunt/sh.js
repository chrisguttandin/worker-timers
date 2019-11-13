module.exports = (grunt) => {
    const continuous = (grunt.option('continuous') === true);
    const fix = (grunt.option('fix') === true);

    return {
        'build-es2018': {
            cmd: 'tsc -p src/tsconfig.json'
        },
        'build-es5-bundle': {
            cmd: 'rollup -c config/rollup/bundle.js'
        },
        'build-es5-module': {
            cmd: 'rollup -c config/rollup/module.js'
        },
        'lint-config': {
            cmd: `eslint --config config/eslint/config.json ${ (fix) ? '--fix ' : '' }--report-unused-disable-directives *.js config/**/*.js`
        },
        'lint-src': {
            cmd: 'tslint --config config/tslint/src.json --project src/tsconfig.json src/*.ts src/**/*.ts'
        },
        'lint-test': {
            cmd: `eslint --config config/eslint/test.json ${ (fix) ? '--fix ' : '' }--report-unused-disable-directives test/**/*.js`
        },
        'test-expectation-edge': {
            cmd: `karma start config/karma/config-expectation-edge.js ${ continuous ? '--concurrency Infinity' : '--single-run' }`
        },
        'test-integration': {
            cmd: `karma start config/karma/config-integration.js ${ continuous ? '--concurrency Infinity' : '--single-run' }`
        }
    };
};
