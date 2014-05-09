### The "assemble" task
_Run the "assemble" task with the `grunt assemble` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

In your project's Gruntfile, add a section named `assemble` to the data object passed into `grunt.initConfig()`.

```js
// All options are, ahem, optional...
assemble: {
  options: {
    assets: 'assets',
    // metadata
    data: ['data/*.{json,yml}'],

    // templates
    partials: ['templates/includes/*.hbs'],
    layout: ['templates/layouts/default.hbs'],

    // extensions
    middlweare: ['assemble-middleware-permalinks'],
  },
  // This is really all you need!
  pages: {
    src: ['docs/*.hbs'],
    dest: './'
  }
},
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html
