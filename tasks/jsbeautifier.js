"use strict";

var path = require("path"),
    jsBeautifier = require("js-beautify").js,
    cssBeautifier = require("js-beautify").css,
    htmlBeautifier = require("js-beautify").html,
    _ = require("lodash"),
    stringUtils = require("underscore.string");

module.exports = function(grunt) {
    grunt.task.registerMultiTask("jsbeautifier", "jsbeautifier.org for grunt", function() {
        var options = this.options({
            mode: "VERIFY_AND_WRITE",
            dest: "",
            js: {},
            css: {},
            html: {}
        });

        var fileCount = 0,
            changedFileCount = 0,
            unverifiedFiles = [];

        function verifyActionHandler(src) {
            unverifiedFiles.push(src);
        }

        function verifyAndWriteActionHandler(src, result) {
            grunt.verbose.writeln(options.dest + src);
            grunt.file.write(options.dest + src, result);
            changedFileCount++;
        }

        function convertCamelCaseToUnderScore(config) {
            var underscoreKey;
            _.forEach([config.js, config.css, config.html], function(conf) {
                _.forEach(conf, function(value, key) {
                    underscoreKey = stringUtils.underscored(key);
                    if ("fileTypes" !== key && key !== underscoreKey) {
                        conf[underscoreKey] = value;
                        delete conf[key];
                    }
                });
            });
        }

        function getConfig() {
            var config,
                jsBeautifyRc = options.config;
            if (jsBeautifyRc) {
                var baseConfig = grunt.file.readJSON(path.resolve(jsBeautifyRc));
                config = {
                    js: {},
                    css: {},
                    html: {}
                };
                _.extend(config.js, baseConfig);
                _.extend(config.css, baseConfig);
                _.extend(config.html, baseConfig);
                _.extend(config.js, baseConfig.js);
                _.extend(config.css, baseConfig.css);
                _.extend(config.html, baseConfig.html);
                _.extend(config.js, options.js);
                _.extend(config.css, options.css);
                _.extend(config.html, options.html);
            } else {
                config = options;
            }
            config.js.fileTypes = _.union(config.js.fileTypes, [".js", ".json"]);
            config.css.fileTypes = _.union(config.css.fileTypes, [".css"]);
            config.html.fileTypes = _.union(config.html.fileTypes, [".html"]);

            grunt.verbose.writeln("Beautify config before converting camelcase to underscore: " + JSON.stringify(config));

            convertCamelCaseToUnderScore(config);

            grunt.verbose.writeln("Using beautify config: " + JSON.stringify(config));
            return config;
        }

        if (this.filesSrc && this.filesSrc.length > 0) {
            if (!_.isEmpty(options.dest)) {
                grunt.verbose.writeln("All beautified files will be stored under \"" + options.dest + "\" folder");
                if (!stringUtils.endsWith(options.dest, "/")) {
                    options.dest += "/";
                }
            }
            grunt.verbose.writeln("Beautifying using filesSrc with " + this.filesSrc.length.toString().cyan + " files...");

            grunt.verbose.writeln("Using mode=\"" + options.mode + "\"...");
            var actionHandler = "VERIFY_ONLY" === options.mode ? verifyActionHandler : verifyAndWriteActionHandler,
                config = getConfig(),
                done = this.async(),
                q = grunt.util.async.queue(function(src, callback) {
                    if (grunt.file.isDir(src)) {
                        callback();
                        return;
                    }

                    beautify(src, config, actionHandler);
                    fileCount++;
                    callback();
                }, 10);

            q.drain = function() {
                if (unverifiedFiles.length) {
                    grunt.fail.warn("The following files are not beautified:\n" + unverifiedFiles.join("\n").cyan + "\n");
                }
                grunt.log.write("Beautified " + fileCount.toString().cyan + " files, changed " + changedFileCount.toString().cyan + " files...");
                grunt.log.ok();
                done();
            };

            q.push(this.filesSrc);
        }
    });

    function beautify(file, config, actionHandler) {
        var setup = getBeautifierSetup(file, config);
        if (!setup) {
            return;
        }

        var beautifier = setup[0],
            beautifyConfig = setup[1],
            addNewLine = setup[2];

        var original = grunt.file.read(file);
        grunt.verbose.write("Beautifying " + file.cyan + "...");
        var result = beautifier(original, beautifyConfig);
        // jsbeautifier would skip the line terminator for js files
        if (addNewLine) {
            result += "\n";
        }
        grunt.verbose.ok();
        /*jshint eqeqeq: false */
        if (original != result) {
            actionHandler(file, result);
        }
    }

    function getFileType(file, config) {
        var fileType = null,
            fileMapping = {
                "js": config.js.fileTypes,
                "css": config.css.fileTypes,
                "html": config.html.fileTypes
            };
        _.forEach(fileMapping, function(extensions, type) {
            fileType = type;
            return -1 === _.findIndex(extensions, function(ext) {
                return stringUtils.endsWith(file, ext);
            });
        });
        return fileType;
    }

    function getBeautifierSetup(file, config) {
        var fileType = getFileType(file, config);
        switch (fileType) {
            case "js":
                return [jsBeautifier, config.js, true];
            case "css":
                return [cssBeautifier, config.css];
            case "html":
                return [htmlBeautifier, config.html];
            default:
                grunt.fail.warn("Cannot beautify " + file.cyan + " (only js, css and html files can be beautified)");
                return null;
        }
    }
};
