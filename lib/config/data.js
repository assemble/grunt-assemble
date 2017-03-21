'use strict';

var debug = require('debug')('assemble:grunt-assemble');
var utils = require('../utils');

module.exports = function(app) {
  return function(val, key, config, next) {
    debug('data:', val);

    if (utils.isObject(val)) {
      app.data(val);
    }

    next();
  };
};
