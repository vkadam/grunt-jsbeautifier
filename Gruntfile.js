module.exports = function(grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        jsbeautifier: {
            default: {
                src: ["package.json", "<%= jshint.files %>", "!test/fixtures/not-been-beautified.js"]
            },
            has_not_been_beautified: {
                src: ["test/fixtures/not-been-beautified.js"],
                options: {
                    mode: "VERIFY_ONLY"
                }
            },
            has_been_beautified: {
                src: ["test/fixtures/been-beautified.js"],
                options: {
                    mode: "VERIFY_ONLY"
                }
            },
            options: {
                indent_size: 4
            }
        },
        nodeunit: {
            all: ["test/**/*.js"]
        },
        jshint: {
            files: ["package.json", "Gruntfile.js", "tasks/**/*.js", "test/**/*.js"],
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
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");

    // By default, beautifiy, lint and run all tests.
    grunt.registerTask("default", ["jshint", "nodeunit", "jsbeautifier:default"]);

};
