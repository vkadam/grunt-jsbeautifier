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

        grunt.file.expand(files).forEach(function(filepath) {
            var result = beautify(grunt.file.read(filepath), tmp_opts);
            // Had to re-beautify for weired issue of block comment.
            result = beautify(result, tmp_opts);

            // ensure newline at end of beautified output
            result += '\n';

            grunt.file.write(filepath, result);
            fileCount++;
        });
        grunt.log.write(["Beautified", fileCount, "files... "].join(" "));
        grunt.log.ok();
    });
};
