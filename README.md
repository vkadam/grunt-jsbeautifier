# grunt-jsbeautifier

[jsbeautifier.org](http://jsbeautifier.org/) for grunt

## Getting Started
This plugin recommends using Grunt `~0.4.1`. Grunt `~0.3.0` is only suported till version 0.1.4

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

### Grunt `~0.4.1`
```
npm install grunt-jsbeautifier --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks('grunt-jsbeautifier');
```

### Grunt `~0.3.0`
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: 

```
npm install grunt-jsbeautifier@0.1.4
```

Then add this line to your project's `grunt.js` gruntfile:

```
grunt.loadNpmTasks('grunt-jsbeautifier');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Config
- jsbeautifier
  - files (required): Your source files to beautify
  - options (optional): Overwrite default jsbeautifier options

### - Minimum config
```
"jsbeautifier" : {
  files : ["src/**/*.js"]
}
```

Default options from jsbeautifier.org will be used

### - Complete config
```
"jsbeautifier" : {
  files : ["src/**/*.js"],
  options : {
    indent_size: 4,
    indent_char: " ",
    indent_level: 0,
    indent_with_tabs: false,
    preserve_newlines: true,
    max_preserve_newlines: 10,
    jslint_happy: false,
    brace_style: "collapse",
    keep_array_indentation: false,
    keep_function_indentation: false,
    space_before_conditional: true,
    eval_code: false,
    indent_case: false,
    wrap_line_length: 80,
    unescape_strings: false
  }
}
```
Only specifiy options to overwrite

## Release History
* 0.1.0: Initial version.
* 0.1.1: Readme file changes
* 0.1.2: Supported grunt 0.4~.
* 0.1.3: Added fix for block comment formatting.
* 0.1.4: Upgraded [js-beautify](https://npmjs.org/package/js-beautify) to latest version (0.3.2)
* 0.1.5: Upgraded to grunt ~0.4.0. Fixed issues [2](https://github.com/vkadam/grunt-jsbeautifier/issues/2), [3](https://github.com/vkadam/grunt-jsbeautifier/issues/3), [4](https://github.com/vkadam/grunt-jsbeautifier/issues/4)
* 0.1.6: Make sure new line at the end of file. Fixed issue [5](https://github.com/vkadam/grunt-jsbeautifier/issues/5)
* 0.1.7: Upgraded grunt to ~0.4.1, [js-beautify](https://npmjs.org/package/js-beautify) to ~1.2.0. Fixed issues [6](https://github.com/vkadam/grunt-jsbeautifier/issues/6), [7](https://github.com/vkadam/grunt-jsbeautifier/issues/7), [8](https://github.com/vkadam/grunt-jsbeautifier/issues/8), [9](https://github.com/vkadam/grunt-jsbeautifier/issues/9)
* 0.1.8: Upgraded [js-beautify](https://npmjs.org/package/js-beautify) to ~1.3.1. Fixed issues [10](https://github.com/vkadam/grunt-jsbeautifier/issues/10), [12](https://github.com/vkadam/grunt-jsbeautifier/issues/12)

## License
Copyright (c) 2012 Vishal Kadam  
Licensed under the MIT license.
