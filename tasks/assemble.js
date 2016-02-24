/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License (MIT).
 */

'use strict';

var async = require('async');
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
      engine: '.hbs',
      layoutdir: '',
      layout: '',
      layoutext: '',
      partials: [],
      data: [],
      assets: '',
      ext: '.html'
    });

    /**
     * Get the instance of assemble to use
     */

    var app = opts.app;
    if (!utils.isObject(opts.app) || !opts.app.isAssemble) {
      var assemble = require('assemble');
      app = assemble();
    }

    // register the `questions` plugin
    app.use(utils.questions());

    // set `grunt` and `task` on the assemble instance
    app.grunt = grunt;
    app.task = this;

    mapper(app).process(opts, function(err) {
      if (err) return cb(err);
      console.log(app.options.engine)

      async.each(app.task.files, function(files, next) {
        app.src(files.src, app.options)
          .pipe(app.renderFile(app.options.engine))
          .pipe(app.dest(function(file) {
            file.base = files.dest;
            file.extname = app.options.ext;
            return file.base;
          }))
          .on('error', next)
          .on('end', next);
      }, cb)
    });
  });
};
