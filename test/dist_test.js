/**
 * Created by vkadam on 12/13/13.
 */
"use strict";
var grunt = require("grunt");
var exec = require("child_process").exec;

exports["dist_test"] = {
    "Verify beautification with dist folder": function(test) {
        test.expect(1);
        exec("grunt jsbeautifier:dist", function(err, stdout, stderr) {
            var actual = grunt.file.read("dist/tmp/not-been-beautified.js"),
                expected = grunt.file.read("test/fixtures/been-beautified.js");
            test.equal(actual, expected, "should beautify js using config file");
            test.done();
        });
    }
};
