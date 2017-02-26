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
        // @todo Use grunt-lint again when it support the type-check option.
        'sh:lint'
    ],
    test: [
        'build',
        'karma:test'
    ]
};
