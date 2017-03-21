/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License (MIT).
 */

'use strict';

var path = require('path');
var series = require('async-each-series');
var plugin = require('../lib/plugin');
// var mapper = require('../lib/mapper');
var utils = require('../lib/utils');

module.exports = function(grunt) {
  grunt.registerMultiTask('assemble', 'static site generator', function() {
    var cb = this.async();

    /**
     * Assemble task options
     */

    var opts = this.options({
      plugins: [],
      helpers: [],
      data: [],
      assets: '',
      ext: '.html',
      engine: 'hbs',
      collections: {},

      partials: [],

      layoutdir: '',
      layout: '',
      layouts: '',
      layoutext: ''
    });

    opts.engine = utils.formatExt(opts.engine);
    opts.layoutext = opts.layoutext ? utils.formatExt(opts.layoutext) : opts.engine;
    opts.layouts = opts.layouts || path.resolve(opts.layoutdir, '*.' + opts.layoutext);

    /**
     * Get the instance of assemble to use
     */

    var app = opts.app;
    if (!utils.isObject(opts.app) || !opts.app.isAssemble) {
      app = require('assemble-core')();
    }

    // set `grunt` and `task` on the assemble instance
    app.grunt = grunt;
    app.task = this;

    app.use(plugin(opts));

    /**
     * Load templates
     */

    app.partials(opts.partials);
    app.layouts(opts.layouts);

    series(app.task.files, function(files, next) {
      app.pages(files.src, app.options);
      app.toStream('pages')
        .pipe(app.renderFile(app.options.engine))
        .on('error', console.log)
        .pipe(app.dest(utils.dest(app, files)))
        .on('error', next)
        .on('end', next);
    }, cb);
  });
};
