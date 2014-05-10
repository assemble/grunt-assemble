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

// setup shortcuts
var Component = assemble.models.Component;
var utils = assemble.utils.utils;

// new object to export
var normalize = module.exports = {};

/**
 * Normalize target.files for assemble to use
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
normalize.files = function (target, next) {
  var options = target.options({
    flatten: true,
    ext: '.html'
  });

  var files = [];

  async.each(target.files, function (filePair, nextFilePair) {
    async.each(filePair.src, function (src, nextSrc) {
      files.push(new Component({
        src: src,
        dest: utils.generateDestination(src, filePair.dest, (filePair.orig.expand || false), options),
        orig: file.readFileSync(src)
      }));
      nextSrc();
    },
    nextFilePair);
  },

  function (err) {
    if (err) {
      return next(err);
    }
    next(null, files);
  });
};
