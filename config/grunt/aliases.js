module.exports = {
    build: [
        'clean:build',
        'replace:worker',
        'sh:build',
        'uglify'
    ],
    continuous: [
        'build',
        'karma:continuous'
    ],
    lint: [
        'eslint',
        'tslint'
    ],
    test: [
        'build',
        'karma:test'
    ]
};
