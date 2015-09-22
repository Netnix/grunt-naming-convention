# grunt-naming-convention

> Grunt Plugin that verifies all the files match their naming convention

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-naming-convention --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-naming-convention');
```

## The "naming_convention" task

### Overview
In your project's Gruntfile, add a section named `naming_convention` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  naming_convention: {
    files: [
      {
        caseName: 'camelCase',
        src: ['path/to/file.txt']
      }
    ]
  },
});
```

### Casename

The list of all possible casenames is available [here](https://www.npmjs.com/package/change-case#usage)

### Files

You can select multiple files with the use of [Grunt's standard Globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns)

### Usage Examples

#### Single Rule with multiple files
Here is an example where all .txt files are checked to follow the camelCase naming convention.

```js
grunt.initConfig({
  naming_convention: {
    files: [
        {
          caseName: 'camelCase',
          src: ['test/fixtures/mixedCaseName/*.txt']
        }
      ]
  },
});
```

#### Multiple Rules with multiple files
Here is an example where all .txt files are checked to follow the camelCase naming convention, while all .js files are checked to follow the pascalCase naming convention.

```js
grunt.initConfig({
  naming_convention: {
    files: [
        {
          caseName: 'camelCase',
          src: ['path/to/files/*.txt']
        },
        {
          caseName: 'pascalCase',
          src: ['path/to/files/*.js']
        }
      ]
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1 Initial commit
