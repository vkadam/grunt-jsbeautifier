"use strict";
var grunt = require("grunt"),
    exec = require("child_process").exec;

(function() {

    function beautify_assert(test, task, actualFile, expectedFile) {
        exec("grunt " + task, function() {
            var actual = grunt.file.read("tmp/config_file/" + actualFile),
                expected = grunt.file.read("tmp/config_file/" + expectedFile);
            test.equal(actual, expected, "should beautify js " + actualFile + " using config file");
            test.done();
        });
    }

    exports["config_file_test"] = {
        "beautification of js file using settings from config file": function(test) {
            test.expect(1);
            beautify_assert(test, "jsbeautifier:config_file", "test.js", "expected/test_expected.js");
        },
        "beautification of css file using settings from config file": function(test) {
            test.expect(1);
            beautify_assert(test, "jsbeautifier:config_file", "test.css", "expected/test_expected.css");
        },
        "beautification of html file using settings from config file": function(test) {
            test.expect(1);
            beautify_assert(test, "jsbeautifier:config_file", "test.html", "expected/test_expected.html");
        }
    };
    exports["config_file_flat_test"] = {
        "beautification of js file using settings from flat config file": function(test) {
            test.expect(1);
            beautify_assert(test, "jsbeautifier:config_file_flat", "test.js", "expected/test_expected.js");
        },
        "beautification of css file using settings from flat config file": function(test) {
            test.expect(1);
            beautify_assert(test, "jsbeautifier:config_file_flat", "test.css", "expected/test_expected.css");
        },
        "beautification of html file using settings from flat config file": function(test) {
            test.expect(1);
            beautify_assert(test, "jsbeautifier:config_file_flat", "test.html", "expected/test_expected.html");
        }
    };
    exports["config_file_with_gruntfile_options_test"] = {
        "beautification of js file using settings from config file and gruntfile": function(test) {
            test.expect(1);
            beautify_assert(test, "jsbeautifier:config_file_with_gruntfile_options", "test.js", "expected/withGruntFileOptions/test_expected.js");
        },
        "beautification of css file using settings from config file and gruntfile": function(test) {
            test.expect(1);
            beautify_assert(test, "jsbeautifier:config_file_with_gruntfile_options", "test.css", "expected/withGruntFileOptions/test_expected.css");
        },
        "beautification of html file using settings from config file and gruntfile": function(test) {
            test.expect(1);
            beautify_assert(test, "jsbeautifier:config_file_with_gruntfile_options", "test.html", "expected/withGruntFileOptions/test_expected.html");
        }
    };
})();
