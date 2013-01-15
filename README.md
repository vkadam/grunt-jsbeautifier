# grunt-jsbeautifier

[jsbeautifier.org](http://jsbeautifier.org/) for grunt

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-jsbeautifier`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-jsbeautifier');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Config
- jsbeautifier
  - files (required): Your source files to beautify
  - options (optional): Overwrite default jsbeautifier options

### - Minimum config
```javascript
"jsbeautifier" : {
  files : ["src/**/*.js"]
}
```

Default options from jsbeautifier.org will be used

### - Complete config
```javascript
"jsbeautifier" : {
  files : ["src/**/*.js"],
  options : {
    "indent_size": 4,
    "indent_char": " ",
    "indent_level": 0,
    "indent_with_tabs": false,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "eval_code": false,
    "indent_case": false,
    "unescape_strings": false
  }
}
```
Only specifiy options to overwrite

## Release History
* 0.1.0: Initial version.
* 0.1.1: Readme file changes
* 0.1.2: Supported grunt 0.4~ compatible.

## License
Copyright (c) 2012 Vishal Kadam  
Licensed under the MIT license.
