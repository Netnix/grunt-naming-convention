/*
 * grunt-naming-convention
 * https://github.com/Netnix/grunt-naming-convention
 *
 * Copyright (c) 2015 Netnix
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jscs: {
      src: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        config: '.jscsrc'
      }
    },
    // Configuration to be run (and then tested).

    namingConvention: {
      camelCaseFileTest: {
        files: [
          {
            caseName: 'camelCase',
            src: ['test/fixtures/camelFileTest.txt']
          }
        ]
      },
      camelOnpascalCaseFileTest: {
        files: [
          {
            caseName: 'camelCase',
            src: ['test/fixtures/PascalFileTest.txt']
          }
        ]
      },
      twoDifferentCaseNameCorrect: {
        files: [
          {
            caseName: 'camelCase',
            src: ['test/fixtures/mixedCaseName/*.txt']
          },
          {
            caseName: 'pascalCase',
            src: ['test/fixtures/mixedCaseName/*.js']
          }
        ]
      },
      twoDifferentCaseNameIncorrect: {
        files: [
          {
            caseName: 'pascalCase',
            src: ['test/fixtures/mixedCaseName/*.txt']
          },
          {
            caseName: 'camelCase',
            src: ['test/fixtures/mixedCaseName/*.js']
          }
        ]
      },
      nonExistantFile: {
        files: [
          {
            caseName: 'pascalCase',
            src: ['test/fixtures/mixedCaseName/nonExistant.sfa']
          }
        ]
      },
      invalidCaseName: {
        files: [
          {
            caseName: 'AnInvalidCaseName',
            src: ['test/fixtures/.test']
          }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', function (test) {
    switch (test){
      case 'camelCaseFileTest':
        grunt.task.run('namingConvention:camelCaseFileTest');
        break;
      case 'camelOnpascalCaseFileTest':
        grunt.task.run('namingConvention:camelOnpascalCaseFileTest');
        break;
      case 'twoDifferentCaseNameCorrect':
        grunt.task.run('namingConvention:twoDifferentCaseNameCorrect');
        break;
      case 'twoDifferentCaseNameIncorrect':
        grunt.task.run('namingConvention:twoDifferentCaseNameIncorrect');
        break;
      case 'nonExistantFile':
        grunt.task.run('namingConvention:nonExistantFile');
        break;
      case 'invalidCaseName':
        grunt.task.run('namingConvention:invalidCaseName');
        break;
    }
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'jscs', 'nodeunit']);

};
