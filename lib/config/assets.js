'use strict';

var debug = require('debug')('assemble:grunt-assemble');

module.exports = function(app) {
  return function(val, key, config, next) {
    debug('assets:', val);
    next();
  };
};
