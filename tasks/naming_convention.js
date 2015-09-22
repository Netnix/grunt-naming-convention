/*
 * grunt-naming-convention
 * https://github.com/Netnix/grunt-naming-convention
 *
 * Copyright (c) 2015 Netnix
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var Path = require('path');
  var changeCase = require('change-case');
  var colors = require('colors');
  var util = require('util');

  function parsePath (path) {
    var extname = Path.extname(path);
    return {
      dirname: Path.dirname(path),
      basename: Path.basename(path, extname),
      extname: extname
    };
  }

  function checkFileNamingConvention (filepath, caseName) {
    try {
      var parsedPath = parsePath(filepath);
      var expect = changeCase[caseName](parsedPath.basename);

      if (parsedPath.basename !== expect) {
        var response = util.format('Invalid file name at %s :\n > %s is valid',
            colors.red(filepath),
            colors.green(expect + parsedPath.extname)
          );
        grunt.log.error(response);
        return 0;
      }else {
        return 1;
      }
    }catch (err) {
      if (err.toString().indexOf('TypeError: undefined is not a function') !== -1) {
        grunt.verbose.error();
        grunt.fail.warn('Error checking name convention: ' + caseName + ' is an invalid casename. ' +
            '(See https://github.com/blakeembrey/change-case for a list of available casename');
      } else {
        grunt.verbose.error();
        grunt.fail.warn('Error checking name convention:' + err);
      }
      return 0;
    }
  }

  grunt.registerMultiTask('namingConvention',
      'Grunt Plugin that verifies all the files match their naming convention', function () {

        var countOK = 0;

        this.files.forEach(function (rule) {
          rule.src.forEach(function (src) {
            countOK += checkFileNamingConvention(src, rule.caseName);
          });
        });

        if (this.filesSrc.length === 0) {
          grunt.fail.warn('No filenames have been verified to follow naming convention');
        } else {
          grunt.log.ok(countOK +
              ' out of ' + this.filesSrc.length + ' ' +
              grunt.util.pluralize(this.filesSrc.length, 'filename/filenames') +
              ' follow naming conventions');
        }
      });

};
