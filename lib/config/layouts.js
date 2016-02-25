'use strict';

var fs = require('fs');
var debug = require('debug')('assemble:grunt-assemble');
var utils = require('../utils');

module.exports = function(app) {
  return function(val, key, config, next) {
    debug('layouts:', arguments);

    if (!app.layouts) {
      app.create('layouts', {
        renameKey: utils.renameKey(true),
        viewType: 'layout'
      });
    }

    app.grunt.file.expand(val).forEach(function(filepath) {
      debug('adding layout "%s"', filepath);
      console.log(filepath)
      app.layouts.addView(filepath, {
        contents: fs.readFileSync(filepath)
      });
    });

    next();
  };
};
