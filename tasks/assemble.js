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
// var load = require('resolve-dep');
// var _str = require('underscore.string');
var _ = require('lodash');
var normalize = require('../lib/normalize');


module.exports = function (grunt) {
  var logOpts = grunt.option('log');

  // Force unix-style newlines
  grunt.util.linefeed = '\n';

  grunt.registerMultiTask('assemble', 'Compile template files with specified engines', function () {
    var done = this.async();

    grunt.log.writeln(); // empty line

    // normalize grunt options data into assemble metadata
    var options = normalizeOptions(grunt, this, assemble.defaults);

    // normalize grunt files object into assemble files
    normalize.files(this, function (err, files) {

      if (err) {
        grunt.warn(err);
        return done(false);
      }

      options.files = files;
      options.grunt = grunt;

      // mix methods from underscore.string into lodash.
      // _.mixin(_str);

      // var mixins = load(grunt.config.process(options.mixins));
      // mixins.forEach(function(mixin) {
      //   _.mixin(require(mixin));
      // })

      // if there are command line options set, use those
      options.log = options.log || {};
      options.log.level = logOpts || options.log.level || 'error';

      // optionsure assemble and build
      assemble(options).build(function (err, results) {

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
            file.writeFileSync(options.debug || 'tmp/debug-page.json', page);
          }

          file.writeFileSync(page.dest, page.content);
          nextPage();
        }, done);

        grunt.verbose.writeln(); // empty spacer in verbose mode
        grunt.log.writeln('  assembled', keys.length, 'files', 'OK'.green);
      });
    });
  });

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
    options = _.mapValues(options, function (value, option) {

      // make sure some values are arrays
      if (option === 'partials') {
        value = file.arrayify(value);
      }

      // if the value is an array them
      if (_.isArray(value)) {
        return mergeOptions(option, grunt);
      }
      return value;
    });

    // return options
    return options;
  };
};
