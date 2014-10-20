"use strict";

var grunt = require("grunt"),
    exec = require("child_process").exec;

exports.dest_test = {
    "Verify beautification with dest folder": function(test) {
        test.expect(1);
        exec("grunt jsbeautifier:dest", function() {
            var actual = grunt.file.read("dest/tmp/common/not-been-beautified.js"),
                expected = grunt.file.read("test/fixtures/common/been-beautified.js");
            test.equal(actual, expected, "should beautify js using config file");
            test.done();
        });
    }
};
