'use strict';

var exec = require('child_process').exec;

exports.mode_test = {

    'passes with force option': function(test) {
        test.expect(2);
        exec('grunt jsbeautifier:successWithForce --force', {
                cwd: __dirname + '/../'
            },
            function(err, stdout) {
                test.ok(stdout.indexOf('are not beautified') > -1, 'Error message is logged');
                test.equals(err, null, 'Grunt passes because file has been beautified');
                test.done();
            });
    }
};
