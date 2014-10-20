"use strict";
/*jshint -W079*/
var chai = require("chai"),
    expect = chai.expect,
    ncp = require('ncp').ncp,
    grunt = require("grunt"),
    _ = grunt.util._,
    JsBeautifierTask = require("../lib/jsbeautifier");

/*jshint -W030*/
describe("JsBeautifier: Forced Success test", function() {
    var createMockTask,
        mockTask,
        oriGruntFailWarn = grunt.fail.warn,
        warnMessage;

    createMockTask = function(taskOptions, files, done) {
        return {
            _taskOptions: taskOptions,
            files: [{
                src: grunt.file.expand(files)
            }],
            options: function(defs) {
                return _.defaults(this._taskOptions, defs);
            },
            async: function() {
                return done || function() {};
            }
        };
    };

    beforeEach(function(done) {
        grunt.fail.warn = function dummyWarn(err) {
            if (!grunt.option('force')) {
                warnMessage = err;
            }
        };
        grunt.file.mkdir("tmp/verifyMode");
        ncp("test/fixtures/verifyMode", "tmp/verifyMode", done);
    });

    afterEach(function() {
        warnMessage = null;
        mockTask = null;
        grunt.fail.warn = oriGruntFailWarn;
        grunt.file.delete("tmp");
        grunt.option('force', false);
    });

    it("passes with force option", function(done) {
        var task;
        mockTask = createMockTask({
            mode: "VERIFY_ONLY",
            force: true
        }, ["tmp/verifyMode/not-been-beautified.js", "tmp/verifyMode/not-been-beautified.css"], function() {
            expect(warnMessage).to.be.undefined;
            done();
        });

        grunt.option('force', true);

        task = new JsBeautifierTask(mockTask);
        task.run();
    });

});
