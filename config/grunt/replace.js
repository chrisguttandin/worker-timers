module.exports = {
    worker: {
        files: {
            'src/worker/worker.ts': [
                'src/worker/worker.ts'
            ]
        },
        options: {
            patterns: [ {
                match: /(.*)/s,
                replacement: (match) => {
                    return `// tslint:disable-next-line:max-line-length\nexport const worker = \`${ match }\`;\n`;
                }
            } ]
        }
    }
};
