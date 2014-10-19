"use strict";

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        jshint: {
            files: ["package.json", "Gruntfile.js", "lib/**/*.js", "tasks/**/*.js", "test/**/*.js"],
            options: {
                jshintrc: true
            }
        },
        jsbeautifier: {
            default: {
                src: ["<%= jshint.files %>", "!test/fixtures/**", "package.json"]
            },
            successWithForce: {
                src: ["tmp/verifyMode/not-been-beautified.js", "tmp/verifyMode/not-been-beautified.css"],
                options: {
                    mode: "VERIFY_ONLY"
                }
            },
            hasNotBeenBeautified: {
                src: ["tmp/verifyMode/not-been-beautified.js", "tmp/verifyMode/not-been-beautified.css"],
                options: {
                    mode: "VERIFY_ONLY"
                }
            },
            hasBeenBeautified: {
                src: ["tmp/verifyMode/been-beautified.js"],
                options: {
                    mode: "VERIFY_ONLY"
                }
            },
            fileMapping: {
                src: ["tmp/fileMapping/not-beautified.js.erb",
                    "tmp/fileMapping/not-beautified.css.erb", "tmp/fileMapping/not-beautified.html.erb"
                ],
                options: {
                    js: {
                        fileTypes: [".js.erb"],
                        maxPreserveNewlines: 2
                    },
                    css: {
                        fileTypes: [".css.erb"]
                    },
                    html: {
                        fileTypes: [".html.erb"],
                        preserveNewLines: true,
                        maxPreserveNewlines: 1
                    }
                }
            },
            configFile: {
                src: ["tmp/configFile/test.js",
                    "tmp/configFile/test.css", "tmp/configFile/test.html"
                ],
                options: {
                    config: "tmp/configFile/jsbeautifyrc.json"
                }
            },
            configFileFlat: {
                src: "<%= jsbeautifier.configFile.src %>",
                options: {
                    config: "tmp/configFile/jsbeautifyrc_flat.json"
                }
            },
            configFileWithGruntFileOptions: {
                src: "<%= jsbeautifier.configFile.src %>",
                options: {
                    config: "tmp/configFile/jsbeautifyrc_flat.json",
                    js: {
                        indentSize: 3
                    },
                    css: {
                        indentSize: 5
                    },
                    html: {
                        indentSize: 7
                    }
                }
            },
            dest: {
                src: ["tmp/not-been-beautified.js"],
                options: {
                    dest: "dest"
                }
            }
        },
        copy: {
            tmp: {
                src: ["**"],
                dest: "tmp",
                cwd: "test/fixtures",
                expand: true
            }
        },
        clean: ["tmp", "dest"],
        nodeunit: {
            all: ["test/**/*.js"]
        },
        devUpdate: {
            main: {
                options: {
                    updateType: 'force',
                    reportUpdated: false,
                    packages: {
                        devDependencies: true,
                        dependencies: true
                    }
                }
            }
        }
    });

    // Actually load this plugin"s task(s).
    grunt.loadTasks("tasks");

    // By default, beautify, lint and run all tests.
    grunt.registerTask("test", ["jshint", "copy", "nodeunit", "clean"]);
    grunt.registerTask("default", ["devUpdate", "test", "jsbeautifier:default"]);
};
