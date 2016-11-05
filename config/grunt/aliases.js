module.exports = {
    build: [
        'clean:build',
        'replace:worker',
        'sh:build',
        'uglify'
    ],
    continuous: [
        'karma:continuous'
    ],
    lint: [
        'eslint',
        'tslint'
    ],
    test: [
        'karma:test'
    ]
};
