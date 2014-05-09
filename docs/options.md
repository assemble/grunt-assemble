See the documentation for [Options](http://assemble.io/docs/Options.html) for more information.

### [assets](http://assemble.io/docs/options-assets.html)

Type: `String`

Default: `undefined`

Define the destination directory where CSS, JavaScript, images and other similar assets will be stored (some call this _public_). Example:

```js
options: {
  assets: '<%= site.dest %>/public'
}
```

Once defind, the `assets` variable can be used in your templates as follows:

```html
<link rel="stylesheet" href="{{assets}}/css/styles.css">
```

Assemble then automatically resolves the relative path from each destination file to the `assets` directory defined in the options.


### [data](http://assemble.io/docs/options-data.html)

Type: `String|Array|Object`

Default: `undefined`

Used to supply to your templates. Data files can be defined as `JSON` or `YAML`, or data can be passed directly as an object on `options.data`. Wildcard patterns may also be used.

You may also optionally use [front matter](http://assemble.io/docs/YAML-front-matter.html) in pages, layouts and partials. Assemble uses [gray-matter](https://github.com/assemble/gray-matter) for parsing front matter. Please see the [gray-matter docs](https://github.com/assemble/gray-matter) for all available options.


### [layout](http://assemble.io/docs/options-layout.html)

Type: `String`

Default: `undefined`

Layouts may optionally be used to wrap pages with common markup, such as the `<head></head>` section, footer, sitewide javascript etc. Layouts can be defined at the task level, target level, or in the [front matter](http://assemble.io/docs/YAML-front-matter.html) of a page. Layouts can also be nested. Please [visit the layout docs](http://assemble.io/docs/layouts.html) for more info.


### [layoutdir](http://assemble.io/docs/options-layoutdir.html)

Type: `String`

Default: `undefined`

Optionally define a directory to use for [layouts](http://assemble.io/docs/options-layout.html). If defined, layouts may be defined using only the name of the layout. e.g.

```js
options: {
  layoutdir: 'foo/bar/baz',
  layout: 'my-layout.hbs' // instead of "foo/bar/baz/my-layout.hbs"
}
```

### layoutext

Type: `String`

Default: `undefined`

Optionally define the extension to use for layouts. Just define this once at the task-level and you'll be able to define layouts anywhere in the project without a file extension. e.g:

```yaml
---
layout: default  # instead of `default.hbs`
---
```

[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets


### [partials](http://assemble.io/docs/options-partials.html)

Type:  `String|Array`

Default: `undefined`

The directory(ies) to use for Handlebars partials files (e.g. snippets, includes, etc). This can be an array or a string of filepaths or glob patterns.

Example:

```js
options: {
  partials: ['includes/*.hbs', 'snippets/*.hbs']
}
```


### [middleware](http://assemble.io/middleware/)

Type: `String|Array`

Default: `undefined`

Optionally define any middleware for Assemble to use. This should be formatted as an array, and filepaths, glob patterns, or named npm modules may be used.

Example:

```js
options: {
  // here we're specifying both npm and local middleware. no problem!
  middleware: ['assemble-middleware-permalinks', 'my/custom/middleware/*.js']
}
```

See the [docs for middleware](http://assemble.io/middleware/).


### [helpers](http://assemble.io/docs/options-helpers.html)

Type: `String|Array`

Default: [handlebars-helpers](http://github.com/assemble/handlebars-helpers)

By default, Assemble allows any helper from the [handlebars-helpers](http://github.com/assemble/handlebars-helpers) library to be used in your templates. You may also define any number of additional handlebars helpers by passing an array of filepaths, glob patterns, or named npm modules to the `helpers` option.

Example:

```js
options: {
  // here we're specifying both npm and local helpers. no problem!
  helpers: ['handlebars-helper-slugify', 'my/custom/helpers/*.js']
}
```

See the [docs for helpers](http://assemble.io/helpers/).


### [ext](http://assemble.io/docs/options-ext.html)

Type: `String`

Default: `.html`

Optionally define the extension to use on destination files.


### flatten

Type: `Boolean`

Default: `false`

Remove anything after (and including) the first `.` in the destination path, then append this value. In other words, when files are generated from different source folders this "flattens" them into the same destination directory. See [building the files object dynamically][files-object] for more information on `files` formats.


Visit [Assemble's documentation](http://assemble.io) for more information about options.
