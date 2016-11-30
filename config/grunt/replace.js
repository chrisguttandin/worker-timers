const readFileSync = require('fs').readFileSync;

module.exports = {
    worker: {
        files: {
            'src/worker/worker.ts': [
                'src/worker/worker.ts'
            ]
        },
        options: {
            patterns: [ {
                match: /export\sconst\sworker\s=\s`(.*)`;/g,
                replacement: () => {
                    return `export const worker = \`${ readFileSync(require.resolve('midi-json-parser-worker/build/es5/worker.min')) }\`;`;
                }
            } ]
        }
    }
};
