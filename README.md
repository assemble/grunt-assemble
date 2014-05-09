# grunt-assemble  [![NPM version](https://badge.fury.io/js/grunt-assemble.png)](http://badge.fury.io/js/grunt-assemble)  [![Build Status](https://travis-ci.org/assemble/grunt-assemble.png)](https://travis-ci.org/assemble/grunt-assemble) 

> Static site generator for Grunt.js and Yeoman. Assemble makes it dead simple to build modular sites, blogs, gh-pages, components and documentation from reusable templates and data.

## WARNING!!!
grunt-assemble uses the [alpha branch of Assemble (v0.5.0)](https://github.com/assemble/assemble/tree/v0.5.0).

_This is not ready to be used unless you're willing to deal with daily changes, broken code, and lack of documentation._

### [Visit the website →](http://assemble.io)

## Why use Assemble?

1. Most popular site generator for Grunt.js and Yeoman. Assemble is used to build hundreds of web projects, ranging in size from a single page to 14,000 pages (that we're aware of!). [Let us know if you use Assemble](https://github.com/assemble/assemble/issues/300).
1. Allows you to carve your HTML up into reusable fragments: partials, includes, sections, snippets... Whatever you prefer to call them, Assemble does that.
1. Optionally use `layouts` to wrap your pages with commonly used elements and content.
1. "Pages" can either be defined as HTML/templates, JSON or YAML, or directly inside the Gruntfile.
1. It's awesome. Lol just kidding. But seriously, Assemble... is... awesome! and it's fun to use.

...and of course, we use Assemble to build the project's own documentation [http://assemble.io](http://assemble.io):

![image](https://f.cloud.github.com/assets/383994/1463257/f031bcfe-4525-11e3-9a03-89a17eee7518.png)

## Installation
Assemble requires Grunt `~0.4.1` or higher.

_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install Assemble with the following command:

```bash
npm install grunt-assemble --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-assemble');
```

## Overview

### Getting Started
#### The "assemble" task
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


### Options
See the documentation for [Options](http://assemble.io/docs/Options.html) for more information.

#### [assets](http://assemble.io/docs/options-assets.html)

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


#### [data](http://assemble.io/docs/options-data.html)

Type: `String|Array|Object`

Default: `undefined`

Used to supply to your templates. Data files can be defined as `JSON` or `YAML`, or data can be passed directly as an object on `options.data`. Wildcard patterns may also be used.

You may also optionally use [front matter](http://assemble.io/docs/YAML-front-matter.html) in pages, layouts and partials. Assemble uses [gray-matter](https://github.com/assemble/gray-matter) for parsing front matter. Please see the [gray-matter docs](https://github.com/assemble/gray-matter) for all available options.


#### [layout](http://assemble.io/docs/options-layout.html)

Type: `String`

Default: `undefined`

Layouts may optionally be used to wrap pages with common markup, such as the `<head></head>` section, footer, sitewide javascript etc. Layouts can be defined at the task level, target level, or in the [front matter](http://assemble.io/docs/YAML-front-matter.html) of a page. Layouts can also be nested. Please [visit the layout docs](http://assemble.io/docs/layouts.html) for more info.


#### [layoutdir](http://assemble.io/docs/options-layoutdir.html)

Type: `String`

Default: `undefined`

Optionally define a directory to use for [layouts](http://assemble.io/docs/options-layout.html). If defined, layouts may be defined using only the name of the layout. e.g.

```js
options: {
  layoutdir: 'foo/bar/baz',
  layout: 'my-layout.hbs' // instead of "foo/bar/baz/my-layout.hbs"
}
```

#### layoutext

Type: `String`

Default: `undefined`

Optionally define the extension to use for layouts. Just define this once at the task-level and you'll be able to define layouts anywhere in the project without a file extension. e.g:

```yaml
---
layout: default  # instead of `default.hbs`
---
```

[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets


#### [partials](http://assemble.io/docs/options-partials.html)

Type:  `String|Array`

Default: `undefined`

The directory(ies) to use for Handlebars partials files (e.g. snippets, includes, etc). This can be an array or a string of filepaths or glob patterns.

Example:

```js
options: {
  partials: ['includes/*.hbs', 'snippets/*.hbs']
}
```


#### [middleware](http://assemble.io/middleware/)

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


#### [helpers](http://assemble.io/docs/options-helpers.html)

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


#### [ext](http://assemble.io/docs/options-ext.html)

Type: `String`

Default: `.html`

Optionally define the extension to use on destination files.


#### flatten

Type: `Boolean`

Default: `false`

Remove anything after (and including) the first `.` in the destination path, then append this value. In other words, when files are generated from different source folders this "flattens" them into the same destination directory. See [building the files object dynamically][files-object] for more information on `files` formats.


Visit [Assemble's documentation](http://assemble.io) for more information about options.


### Usage Examples
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

#### Using multiple targets

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


## Contributing
Find a bug? Have a feature request? Please [create an Issue](git://github.com/assemble/grunt-assemble/issues).

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality,
and run `docs` in the command line to build the docs with [Verb](https://github.com/assemble/verb).

Pull requests are also encouraged, and if you find this project useful please consider "starring" it to show your support! Thanks!

## Assemble plugins
Here are some related projects you might be interested in from the [Assemble](http://assemble.io) core team.

+ [assemble-middleware-anchors](https://api.github.com/repos/assemble/assemble-middleware-anchors): Assemble middleware for creating anchor tags from generated html. 
+ [assemble-middleware-contextual](https://api.github.com/repos/assemble/assemble-middleware-contextual): Assemble middleware for generating a JSON file containing the context of each page. Basic middleware to help see what's happening in the build. 
+ [assemble-middleware-decompress](https://api.github.com/repos/assemble/assemble-middleware-decompress): Assemble plugin for extracting zip, tar and tar.gz archives.  
+ [assemble-middleware-download](https://api.github.com/repos/assemble/assemble-middleware-download): Assemble middleware for downloading files from GitHub. 
+ [assemble-middleware-drafts](https://api.github.com/repos/assemble/assemble-middleware-drafts): Assemble middleware (v0.5.0) for preventing drafts from being rendered. 
+ [assemble-middleware-i18n](https://api.github.com/repos/assemble/assemble-middleware-i18n): Assemble middleware for adding i18n support to projects. 
+ [assemble-middleware-lunr](https://api.github.com/repos/assemble/assemble-middleware-lunr): Assemble middleware for creating a search engine within your static site using lunr.js. 
+ [assemble-middleware-permalinks](https://api.github.com/repos/assemble/assemble-middleware-permalinks): Permalinks middleware for Assemble, the static site generator for Grunt.js and Yeoman. This plugin enables powerful and configurable URI replacement patterns, presets, uses Moment.js for parsing dates, and much more. 
+ [assemble-middleware-rss](https://api.github.com/repos/assemble/assemble-middleware-rss): Assemble middleware for creating RSS feeds with Assemble. (NOT published yet!) 
+ [assemble-middleware-sitemap](https://api.github.com/repos/assemble/assemble-middleware-sitemap): Assemble middleware for generating sitemaps. 
+ [assemble-middleware-toc](https://api.github.com/repos/assemble/assemble-middleware-toc): Assemble middleware for creating a table of contents in the generated HTML, using Cheerio.js 
+ [assemble-middleware-wordcount](https://api.github.com/repos/assemble/assemble-middleware-wordcount): Assemble middleware for displaying a word-count, and estimated reading time on blog posts or pages.  

Visit [assemble.io/assemble-middleware](http:/assemble.io/assemble-middleware/) for more information about [Assemble](http:/assemble.io/) middleware.


## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb)


## Release History
**DATE**       **VERSION**    **CHANGES**                                                                
* 2013-12-01   v0.5.0-alpha   Starting major refactoring.                                                
* 2013-10-25   v0.4.17        Adds a params object to the call to `helper.register` allowing grunt and   
                              assemble to be passed in and used from inside helpers.                     
* 2013-10-24   v0.4.16        Adds support for using wildcards with plugins stages.                      
* 2013-10-24   v0.4.15        Implements multiple plugin stages.                                         
* 2013-10-21   v0.4.14        Adds support for plugins running once, before and after (thanks            
                              @adjohnson916).,Adds pagination!,Thanks to @xzyfer, `options.data` can now 
                              also directly accept an object of data.                                    
* 2013-10-12   v0.4.13        Adds `originalAssets` property to root context to store the pre-calculated 
                              assets path                                                                
* 2013-10-05   v0.4.12        Fixes plugins resolving for devDependencies.                               
* 2013-10-03   v0.4.11        Adds filePair to page object. thanks @adjohnson916!                        
* 2013-10-02   v0.4.10        Adds plugin support to Assemble using the `plugins` option. thanks         
                              @adjohnson916!                                                             
* 2013-10-02   v0.4.9         Adds `layoutext` and `postprocess` options.                                
* 2013-09-30   v0.4.8         Assemble now builds 30-50% faster due to some refactoring to async and how 
                              context is calculated.                                                     
* 2013-09-20   v0.4.7         Adds grunt-readme to make it easier to keep the readme updated using       
                              templates.,Keep options.partials intact so they can be used in helpers.    
* 2013-09-15   v0.4.6         Updating how the assets path is calculated.,Adding resolve-dep and ability 
                              to load helpers from node modules using minimatch patterns                 
* 2013-09-03   v0.4.5         Bug fix: allow page content containing $.,Add alias metadata for data on   
                              pages configuration object.                                                
* 2013-08-01   v0.4.4         Adds "nested layouts",Adds option for pages in JSON/YAML collections to be 
                              defined as either objects or keys in an array.                             
* 2013-08-01   v0.4.3         Adds "options.pages" for passing in an array of pages in JSON or YAML      
                              format.                                                                    
* 2013-06-20   v0.4.0         Adds "layoutdir" option for defining the directory to be used for layouts. 
                              If layoutdir is defined, then layouts may be defined using only the name of
                              the layout.                                                                
* 2013-06-10   v0.3.81        Adds additional ways to load custom helpers. Now it's possible to use a    
                              glob pattern that points to a list of scripts with helpers to load.,Adds   
                              examples and tests on how to use the new custom helper loading methods.    
* 2013-06-01   v0.3.80        Fixing bug with null value in engine                                       
* 2013-05-07   v0.3.77        Updated README with info about assemble methods                            
* 2013-04-28   v0.3.74        Updating the assemble library to use the assemble-utils repo and           
                              unnecessary code.                                                          
* 2013-04-21   v0.3.73        Fixing how the relative path helper worked and showing an example in the   
                              footer of the layout. This example is hidden, but can be seen by doing view
                              source.                                                                    
* 2013-04-20   v0.3.72        Fixing the layout override issue happening in the page yaml headers.       
                              Something was missed during refactoring.                                   
* 2013-04-19   v0.3.9         Adds tags and categories to the root context and ensure that the current   
                              page context values don't override the root context values.                
* 2013-04-18   v0.3.8         Updating to use actual assets property from current page.                  
* 2013-04-17   v0.3.7         Cleaning up some unused folders and tests                                  
* 2013-04-16   v0.3.6         Fixed missing assets property.                                             
* 2013-04-16   v0.3.5         Adds a sections array to the template engine so it can be used in helpers. 
* 2013-04-11   v0.3.4         More tests for helpers and global variables, organized tests. A number of  
                              bug fixes.                                                                 
* 2013-04-06   v0.3.3         helper-lib properly externalized and wired up. Global variables for        
                              filename, ext and pages                                                    
* 2013-03-22   v0.3.22        Merged global and target level options so data and partial files can be    
                              joined                                                                     
* 2013-03-22   v0.3.21        Valid YAML now allowed in options.data object (along with JSON)            
* 2013-03-18   v0.3.14        new relative helper for resolving relative paths                           

## License
Copyright (c) 2014 Assemble, contributors.  
Released under the MIT license


***

_This file was generated by [grunt-verb](https://github.com/assemble/grunt-verb) on May 09, 2014._
