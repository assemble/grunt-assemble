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
 * Normalize target.files into components
 * for assemble to use
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
normalize.files = function (target, done) {

  var components = [];
  var options = target.options({
    flatten: false,
    ext: '.html'
  });

  async.each(target.files,
    function (filePair, nextFilePair) {
      async.each(filePair.src,
        function (src, nextSrc) {
          components.push(new Component({
            src: src,
            dest: utils.generateDestination(src, filePair.dest, (filePair.orig.expand || false), options),
            raw: file.readFileSync(src)
          }));
          nextSrc();
        },
        nextFilePair);
    },

    function (err) {
      if (err) {
        return done(err);
      }
      done(null, components);
    });
};

/**
 * normalize target.options into options
 * and metadata that assemble can use
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
normalize.options = function (grunt, target, defaults) {

  // get the options from the target, with defaults
  defaults = defaults || {};
  var options = target.options(defaults);

  // merge task and target arrays
  options = _.mapValues(options, function (value, key) {
    if (_.isArray(value)) {
      return normalize.mergeOptions(key, grunt);
    }
    return value;
  });

  // return options
  return options;
};

normalize.mergeOptions = function (name, grunt) {
  var task = grunt.task.current;
  var taskArray = grunt.config([task.name, 'options', name]) || [];
  var targetArray = grunt.config([task.name, task.target, 'options', name]) || [];
  return _.union(taskArray, targetArray);
};