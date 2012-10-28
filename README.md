# grunt-jsbeautifier

jsbeautifier.org for grunt

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
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 0.1.0: Initial version.

## License
Copyright (c) 2012 Vishal Kadam  
Licensed under the MIT license.
