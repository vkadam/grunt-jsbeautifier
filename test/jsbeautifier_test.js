"use strict";
var grunt = require('grunt');
var exec = require('child_process').exec;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['jsbeautifier'] = {
    setUp: function(done) {
        // setup here
        done();
    },
    'Verify beautification with unbeautified file': function(test) {
        test.expect(1);
        exec('grunt jsbeautifier:has_not_been_beautified', {
                cwd: __dirname + '/../'
            },
            function(err, stdout, stderr) {
                test.notEqual(err, null, 'Grunt fails because file has not been beautified');
                test.done();
            });

    },
    'Verify beautification with beautified file': function(test) {
        test.expect(1);
        exec('grunt jsbeautifier:has_been_beautified', {
                cwd: __dirname + '/../'
            },
            function(err, stdout, stderr) {
                test.equal(err, null, 'Grunt passes because file has been beautified');
                test.done();
            });

    }
};
