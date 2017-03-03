'use strict';

var fs = require('fs');
var debug = require('debug')('assemble:grunt-assemble');
var utils = require('../utils');

module.exports = function(app) {
  return function(patterns, key, config, next) {
    debug('layouts:', patterns);

    if (!app.layouts) {
      app.create('layouts', {viewType: 'layout'});
    }

    app.layouts(patterns);
    next();
  };
};
