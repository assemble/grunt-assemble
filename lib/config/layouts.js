'use strict';

var debug = require('debug')('assemble:grunt-assemble');

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
