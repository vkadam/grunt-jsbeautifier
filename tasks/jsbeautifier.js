/*
 * grunt-jsbeautifier
 * https://github.com/vkadam/grunt-jsbeautifier
 *
 * Copyright (c) 2012 Vishal Kadam
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    "use strict";
    // Please see the grunt documentation for more information regarding task and
    // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md
    // ==========================================================================
    // TASKS
    // ==========================================================================
    grunt.registerTask('jsbeautifier', 'jsbeautifier.org for grunt', function() {
        // Beautify specified files.
        var jsBeautifierOrg = require('js-beautify'),
            beautify = jsBeautifierOrg.js_beautify,
            files = grunt.config(['jsbeautifier', 'files']),
            tmp_opts = grunt.config(['jsbeautifier', 'options']);

        if (tmp_opts) {
            grunt.verbose.writeln(["Using options", JSON.stringify(tmp_opts)].join(" "));
        }
        var fileCount = 0;

        grunt.file.expandFiles(files).forEach(function(filepath) {
            var result = beautify(grunt.file.read(filepath), tmp_opts);
            grunt.file.write(filepath, result);
            fileCount++;
        });
        grunt.log.write(["Beautified", fileCount, "files... "].join(" "));
        grunt.log.ok();
    });

    // ==========================================================================
    // HELPERS
    // ==========================================================================
    grunt.registerHelper('jsbeautifier', function() {
        return 'jsbeautifier!!!';
    });
};