/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License (MIT).
 */

'use strict';

var path = require('path');
var async = require('async');
var namespace = require('namespace-context');
var middleware = require('../lib/middleware');
var mapper = require('../lib/mapper');
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
    opts.layouts = opts.layouts || path.join(opts.layoutdir, '*.' + opts.layoutext);

    /**
     * Get the instance of assemble to use
     */

    var app = opts.app;
    if (!utils.isObject(opts.app) || !opts.app.isAssemble) {
      var assemble = require('assemble-core');
      app = assemble();
    }

    // load options onto `app.options`
    app.option(opts);

    // register the `questions` plugin
    app.use(utils.questions());

    // set `grunt` and `task` on the assemble instance
    app.grunt = grunt;
    app.task = this;

    mapper(app).process(opts, function(err) {
      if (err) return cb(err);

      app.option('context', function(locals) {
        var context = utils.extend({}, this.cache.data);
        context.data = utils.extend({}, locals);
        return context;
      });

      app.use(namespace('page'));

      // register built-in middleware
      middleware(app);

      async.each(app.task.files, function(files, next) {
        app.src(files.src, app.options)
          .on('error', console.log)
          .pipe(app.renderFile(app.options.engine))
          .on('error', console.log)
          .pipe(app.dest(utils.dest(app, files)))
          .on('error', next)
          .on('end', next);
      }, cb)
    });
  });
};
