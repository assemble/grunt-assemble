Simple example of using data files in both `.json` and `.yml` format to build Handlebars templates.

```javascript
assemble: {
  options: {
    data: 'src/data/**/*.{json,yml}'
  },
  docs: {
    files: {
      'dist/': ['src/templates/**/*.hbs']
    }
  }
}
```

### Using multiple targets

```js
assemble: {
  options: {
    assets: 'assets',
    layoutdir: 'docs/layouts'
    partials: ['docs/includes/**/*.hbs'],
    data: ['docs/data/**/*.{json,yml}']
  },
  site: {
    options: {
      layout: 'default.hbs'
    },
    src: ['templates/site/*.hbs'],
    dest: './'
  },
  blog: {
    options: {
      layout: 'blog-layout.hbs'
    },
    src: ['templates/blog/*.hbs'],
    dest: 'articles/'
  },
  docs: {
    options: {
      layout: 'docs-layout.hbs'
    },
    src: ['templates/docs/*.hbs'],
    dest: 'docs/'
  }
},
```

Visit [Assemble's documentation](http://assemble.io) for many more examples and pointers on getting started.


# Examples

> Gruntfile configuration examples for the "assemble" task


## Prettify HTML

> Use js-prettify with Assemble's `postprocess` option to format generated HTML

To get started, in the command line run `npm i js-prettify --save-dev` to add js-prettify to your project.

### Prettify all generated HTML

Use the `postprocess` option to prettify output HTML for all targets in the task:

```js
assemble: {
  options: {
    postprocess: require('pretty')
  },
  site: {
    files: {
      'site/': ['templates/site/*.hbs']
    }
  }
}
```

### Prettify a single target

If you only want to format the generated HTML for a specific target, just put use the `postprocess` function in the options for that target:

```js
assemble: {
  options: {
    // task-level options
  },
  site: {
    options: {postprocess: require('pretty')},
    files: {
      'site/': ['templates/site/*.hbs']
    }
  }
}
```

