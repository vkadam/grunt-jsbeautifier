"use strict";
/*jshint -W079*/
var chai = require("chai"),
    JsBeautifierTask = require("../lib/jsbeautifier"),
    createMockTask = require("./mockTask");

chai.use(require('chai-fs'));
/*jshint -W030*/
describe("JsBeautifier: Generic test", function() {
    var mockTask;

    afterEach(function() {
        mockTask = null;
    });

    it("Verify task response with empty source", function(done) {
        var task;
        mockTask = createMockTask({}, [], function() {
            done();
        });

        task = new JsBeautifierTask(mockTask);
        task.run();
    });
});
