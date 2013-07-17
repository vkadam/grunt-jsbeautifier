module.exports = function(grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        jsbeautifier: {
            default: {
                src: ['package.json', '<%= jshint.files %>']
            },
            has_not_been_beautified: {
                src: ['test/fixtures/not-been-beautified.js'],
                options: {
                    verify_beautification: true
                }
            },
            has_been_beautified: {
                src: ['test/fixtures/been-beautified.js'],
                options: {
                    verify_beautification: true
                }
            },
            options: {
                indent_size: 4
            }
        },
        nodeunit: {
            all: ['test/**/*.js']
        },
        jshint: {
            files: ['package.json', 'Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // By default, beautifiy, lint and run all tests.
    grunt.registerTask('default', ['jsbeautifier:default', 'jshint', 'nodeunit']);

};
