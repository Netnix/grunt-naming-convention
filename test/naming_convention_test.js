'use strict';

var grunt = require('grunt');
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

exports.namingConvention = {

  camelOnpascalCaseFileTest: function (test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['test:camelOnpascalCaseFileTest']
    }, function (err, result) {
      test.ok(result.stdout.indexOf('Invalid file name at') !== -1, 'File name should be invalid.');
      test.ok(result.stdout.indexOf('Error checking name convention') === -1, 'There should be no errors');
      test.ok(result.stdout.indexOf('0 out of 1') !== -1,
          'There should be 1 file checked and 0 file following naming convention');
      test.done();
    });
  },
  camelCaseFileTest: function (test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['test:camelCaseFileTest']
    }, function (err, result) {
      test.ok(result.stdout.indexOf('Invalid file name at') === -1, 'File name should be invalid.');
      test.ok(result.stdout.indexOf('Error checking name convention') === -1, 'There should be no errors');
      test.ok(result.stdout.indexOf('1 out of 1') !== -1,
          'There should be 1 file checked and 1 file following naming convention');
      test.done();
    });
  },
  twoDifferentCaseNameCorrect: function (test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['test:twoDifferentCaseNameCorrect']
    }, function (err, result) {
      test.ok(result.stdout.indexOf('Invalid file name at') === -1, 'File name should be invalid.');
      test.ok(result.stdout.indexOf('Error checking name convention') === -1, 'There should be no errors');
      test.ok(result.stdout.indexOf('4 out of 4') !== -1,
          'There should be 4 file checked and 4 file following naming convention');
      test.done();
    });
  },
  twoDifferentCaseNameIncorrect: function (test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['test:twoDifferentCaseNameIncorrect']
    }, function (err, result) {
      var count = (result.stdout.match(/Invalid file name at/g) || []).length;
      test.ok(count === 4, 'There should be 4 invalid files, but only found: ' + count);
      test.ok(result.stdout.indexOf('Error checking name convention') === -1, 'There should be no errors');
      test.ok(result.stdout.indexOf('0 out of 4') !== -1,
          'There should be 4 file checked and 0 file following naming convention');
      test.done();
    });
  },
  nonExistantFile: function (test) {
    test.expect(2);
    grunt.util.spawn({
      grunt: true,
      args: ['test:nonExistantFile']
    }, function (err, result) {
      test.ok(result.stdout.indexOf('Error checking name convention') === -1, 'There should be no errors');
      test.ok(result.stdout.indexOf('No filenames have been verified to follow naming convention') !== -1,
          'There should be a warning');
      test.done();
    });
  },
  invalidCaseName: function (test) {
    test.expect(2);
    grunt.util.spawn({
      grunt: true,
      args: ['test:invalidCaseName']
    }, function (err, result) {
      console.log(result.stdout);
      test.ok(result.stdout.indexOf('Error checking name convention') !== -1, 'There should be an error');
      test.ok(result.stdout.indexOf('is an invalid casename') !== -1, 'Error should be because of invalid casename');
      test.done();
    });
  }
};
