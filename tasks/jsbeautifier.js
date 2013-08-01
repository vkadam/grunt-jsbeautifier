module.exports = function(grunt) {
    "use strict";

    var path = require('path');

    var js_beautifier = require('js-beautify');
    var jsbeautifier = js_beautifier.js;
    var cssbeautifier = js_beautifier.css;
    var htmlbeautifier = js_beautifier.html;
    // Please see the grunt documentation for more information regarding task and
    // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md
    // ==========================================================================
    // TASKS
    // ==========================================================================
    grunt.task.registerMultiTask('jsbeautifier', 'jsbeautifier.org for grunt', function() {

        var params = this.options({
            mode: "VERIFY_AND_WRITE"
        });

        var fileCount = 0;
        var changedFileCount = 0;

        function verifyActionHandler(src) {
            grunt.fail.warn(src.cyan + ' was not beautified');
        }

        function verifyAndWriteActionHandler(src, result) {
            grunt.file.write(src, result);
            changedFileCount++;
        }

        if (this.filesSrc && this.filesSrc.length > 0) {
            grunt.verbose.writeln('Beautifing using filesSrc with ' + this.filesSrc.length.toString().cyan + ' files...');

            grunt.verbose.writeln('Using mode="' + params.mode + '"...');
            var actionHandler = "VERIFY_ONLY" === params.mode ? verifyActionHandler : verifyAndWriteActionHandler;

            var config;
            if (params.config) {
                config = grunt.file.readJSON(path.resolve(params.config));
                grunt.util._.extend(config.js, params.js);
                grunt.util._.extend(config.css, params.css);
                grunt.util._.extend(config.html, params.html);
            } else {
                config = params;
            }

            grunt.verbose.writeln('Using beautify config: ' + JSON.stringify(config));

            var done = this.async();
            var q = grunt.util.async.queue(function(src, callback) {
                if (grunt.file.isDir(src)) {
                    callback();
                    return;
                }

                beautify(src, config, actionHandler);
                fileCount++;
                callback();
            }, 10);
            q.drain = function() {
                grunt.log.write('Beautified ' + fileCount.toString().cyan + ' files, changed ' + changedFileCount.toString().cyan + ' files...');
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

        var beautifier = setup[0];
        config = setup[1];

        var original = grunt.file.read(file);
        grunt.verbose.write('Beautifing ' + file.cyan + '...');
        var result = beautifier(original, config);
        // jsbeautifier would skip the line terminator for js files
        if (['.js', '.json'].indexOf(path.extname(file)) !== -1) {
            result += '\n';
        }
        grunt.verbose.ok();
        /*jshint eqeqeq: false */
        if (original != result) {
            actionHandler(file, result);
        }
    }

    function getBeautifierSetup(file, config) {
        var ext = path.extname(file);
        switch (ext) {
            case '.js':
            case '.json':
                return [jsbeautifier, config.js];
            case '.css':
                return [cssbeautifier, config.css];
            case '.html':
                return [htmlbeautifier, config.html];
            default:
                grunt.fail.warn('Cannot beautify ' + file.cyan + ' (only .js, .css and .html are beautifiable)');
                return null;
        }
    }
};
