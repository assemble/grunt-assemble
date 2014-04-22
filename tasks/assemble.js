/*
 * Assemble <https://github.com/assemble/>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

//var path = require('path');
var file = require('fs-utils');
var async = require('async');
var assemble = require('assemble');
//var _str = require('underscore.string');
var _ = require('lodash');
var normalize = require('../lib/normalize');


module.exports = function (grunt) {
  var logOpts = grunt.option('log');

  // Force unix-style newlines
  grunt.util.linefeed = '\n';

  grunt.registerMultiTask('assemble', 'Compile template files with specified engines', function () {

    var self = this;
    var done = this.async();

    grunt.log.writeln(); // empty line

    // Store Grunt's original config data
    //var originalConfig = _.cloneDeep(grunt.config.data);

    // normalize grunt options data into assemble metadata
    var options = normalizeOptions(grunt, this, assemble.defaults);

    // normalize grunt files object into assemble pages
    normalize.files(this, function (err, pages) {

      if (err) {
        grunt.warn(err);
        return done(false);
      }

      options.pages = pages;
      options.grunt = grunt;

      // mix methods from underscore.string into lodash.
      //_.mixin(_str);

      // Enable mixins to be registered from the options Currently this is set
      // to options.utils since options.mixins used by boson and doesn't work.
      //var mixins = file.expand(options.utils || []);
      //if (mixins.length > 0) {
      //  mixins.forEach(function(name) {
      //    // Try as a npm module
      //    try {
      //      _.mixin(name);
      //    } catch(err) {
      //      // Try as a local file
      //      try {
      //        _.mixin(require(path.resolve(name)));
      //      } catch(err) {}
      //    }
      //  });
      //}

      // if there are command line options set, use those
      options.log = options.log || {};
      options.log.level = logOpts || options.log.level || 'error';

      // build the assemble options object
      var assembleOptions = {
        name: self.target,
        metadata: options
      };

      // Build up the context with config data
      //processContext();

      // Restore Grunt's config data.
      //grunt.config.data = originalConfig;

      // configure assemble and build
      assemble(assembleOptions).build(function (err, results) {

        if (err) {
          grunt.warn(err);
          done(false);
        }

        // write out the resulting pages
        var keys = _.keys(results.pages);

        async.each(keys, function (key, nextPage) {
          var page = results.pages[key];
          grunt.log.writeln('  writing'.green, page.dest);

          if (options.debug) {
            grunt.verbose.writeln(page);
            file.writeFileSync(options.debug || 'tmp/debug-paeg.json', page);
          }

          file.writeFileSync(page.dest, page.content);
          nextPage();
        }, done);

        grunt.verbose.writeln(); // empty spacer in verbose mode
        grunt.log.writeln('  assembled', keys.length, 'files', 'OK'.green);
      });
    });
  });

  //var processContext = function(context, data) {
  //  _.extend(grunt.config.data, context, data);
  //  return grunt.config.process(data || context);
  //};

  var mergeOptions = function (name, grunt) {
    var task = grunt.task.current;
    var taskArray = grunt.config([task.name, 'options', name]) || [];
    var targetArray = grunt.config([task.name, task.target, 'options', name]) || [];
    return _.union(file.arrayify(taskArray), file.arrayify(targetArray));
  };

  /**
   * normalize target.options into options
   * and metadata that assemble can use
   * @param  {[type]} target [description]
   * @return {[type]}        [description]
   */
  var normalizeOptions = function (grunt, target, defaults) {

    // get the options from the target, with defaults
    defaults = defaults || {};
    var options = target.options(defaults);

    // merge task and target arrays
    options = _.mapValues(options, function (value, key) {

      // make sure some values are arrays
      if (key === 'partials') {
        value = file.arrayify(value);
      }

      // if the value is an array them
      if (_.isArray(value)) {
        return mergeOptions(key, grunt);
      }
      return value;
    });

    // return options
    return options;
  };

};
