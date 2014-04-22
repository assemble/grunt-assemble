/**
 * Assemble
 *
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2014 Assemble.
 * Licensed under the MIT License (MIT).
 */

// require node modules
var assemble = require('assemble');
var file = require('fs-utils');
var async = require('async');
var _ = require('lodash');

// setup shortcuts
var Component = assemble.models.Component;
var utils = assemble.utils.utils;

// new object to export
var normalize = module.exports = {};

/**
 * Normalize target.files into pages
 * for assemble to use
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
normalize.files = function (target, done) {

  var options = target.options({
    flatten: true,
    ext: '.html'
  });

  var pages = options.pages || [];

  if (_.isObject(pages)) {
    var obj = pages;
    pages = [];
    _.map(_.keys(obj), function (key) {
      var page = obj[key];
      page.filename = page.filename || page.name || key;
      pages.push(page);
    });
  }

  async.each(target.files, function (filePair, nextFilePair) {
    async.series([
      // if pages is already a list of objects, make sure there are destinations associated with them
      function (nextTask) {
        async.each(pages, function (page, nextPage) {
          page.metadata = page.metadata || page.data;
          if (!page.dest && !(page.metadata && page.metadata.dest)) {
            var src = page.src || page.metadata.src || page.filename || page.metadata.filename || page.name || page.metadata.name || '';
            page.dest = page.metadata.dest = utils.generateDestination(src, filePair.dest, (filePair.orig.expand || false), options);
          }
          nextPage();
        },
        nextTask);
      },

      // normalize the files in the filePair
      function (nextTask) {
        async.each(filePair.src, function (src, nextSrc) {
          pages.push(new Component({
            src: src,
            dest: utils.generateDestination(src, filePair.dest, (filePair.orig.expand || false), options),
            raw: file.readFileSync(src)
          }));
          nextSrc();
        },
        nextTask);
      }
    ],
    nextFilePair);

  },

  function (err) {
    if (err) {
      return done(err);
    }
    done(null, pages);
  });
};
