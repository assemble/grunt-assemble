Simple example of using `.json`/`.yml` files to pass data to Handlebars templates:

```javascript
assemble: {
  options: {
    data: 'data/*.{json,yml}'
  },
  docs: {
    files: {
      '_gh_pages/': ['templates/**/*.hbs']
    }
  }
}
```

### Using multiple targets

```js
assemble: {
  options: {
    assets: 'assets',
    layoutdir: 'docs/layouts', // default layout directory
    layoutext: '.hbs', // default layout extension
    partials: ['includes/*.hbs'],
    data: ['data/*.{json,yml}']
  },
  site: {
    options: {
      layout: 'default.hbs'
    },
    src: ['templates/site/*.hbs'],
    dest: '_gh_pages/'
  },
  blog: {
    options: {
      layout: 'blog-layout.hbs'
    },
    src: ['content/blog/*.md'],
    dest: '_gh_pages/blog/'
  },
  docs: {
    options: {
      layout: 'docs-layout.hbs'
    },
    src: ['templates/docs/*.hbs'],
    dest: '_gh_pages/docs/'
  }
},
```

Visit [Assemble's documentation](http://assemble.io) for many more examples and pointers on getting started.
