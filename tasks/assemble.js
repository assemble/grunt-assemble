/*
 * Assemble
 * https://github.com/assemble/
 *
 * Copyright (c) 2013 Upstage
 * Licensed under the MIT license.
 */

// node libs
var assemble = require('assemble');
var file = require('fs-utils');
var async = require('async');
var _ = require('lodash');

// local libs
var normalize = require('../lib/normalize');

module.exports = function (grunt) {

  grunt.registerMultiTask('assemble', 'Compile template files with specified engines', function () {

    var done = this.async();
    var self = this;

    // normalize grunt files object into assemble components
    normalize.files(this, function (err, components) {

      if (err) {
        grunt.warn(err);
        return done(false);
      }

      // normalize grunt options data into assemble metadata
      var options = normalize.options(grunt, self, assemble.defaults);
      options.components = components;

      // build the assemble options object
      var assembleOptions = {
        name: self.target,
        metadata: options
      };

      // configure assemble and build
      assemble(assembleOptions)
        .build(function (err, results) {

          if (err) {
            grunt.warn(err);
            done(false);
          }

          // write out the resulting components
          var keys = _.keys(results.components);
          async.each(keys,
            function (key, nextComponent) {
              var component = results.components[key];
              file.writeFileSync(component.dest, component.content);
              nextComponent();
            },
            done);
        });


    });
  });

};