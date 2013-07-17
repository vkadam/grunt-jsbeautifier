module.exports = function(grunt) {
    "use strict";
    // Please see the grunt documentation for more information regarding task and
    // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md
    // ==========================================================================
    // TASKS
    // ==========================================================================
    grunt.task.registerMultiTask('jsbeautifier', 'jsbeautifier.org for grunt', function() {

        var beautify = require('js-beautify').js_beautify;
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

        if (this.filesSrc) {
            grunt.verbose.writeln('Beautifing using filesSrc with ' + this.filesSrc.length.toString().cyan + ' files...');

            var actionHandler = verifyAndWriteActionHandler;
            grunt.verbose.writeln('Using mode="' + params.mode + '"...');
            if ("VERIFY_ONLY" === params.mode) {
                actionHandler = verifyActionHandler;
            }

            this.filesSrc.forEach(function(src) {
                if (grunt.file.isDir(src)) {
                    return;
                }
                var original = grunt.file.read(src);
                grunt.verbose.write('Beautifing ' + src.cyan + '...');
                var result = beautify(original, params);
                result += '\n';
                grunt.verbose.ok();
                if (original !== result) {
                    actionHandler.apply(this, [src, result]);
                }
                fileCount++;
            });
        }
        grunt.log.write('Beautified ' + fileCount.toString().cyan + ' files, changed ' + changedFileCount.toString().cyan + ' files...');
        grunt.log.ok();
    });
};
