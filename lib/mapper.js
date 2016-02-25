'use strict';

var debug = require('debug')('assemble:grunt-assemble:mapper');
var extend = require('extend-shallow');
var MapConfig = require('map-config');
var config = require('./config');

module.exports = function(app, options) {
  var opts = extend({omit: []}, options);
  var mapper = new MapConfig();

  for (var key in config) {
    if (key === 'omit') continue;

    var hasKey = config.hasOwnProperty(key);
    if (!~opts.omit.indexOf(key) && hasKey) {
      debug('mapping option "%s"', key);
      mapper.map(key, config[key](app));

    } else if (!hasKey) {
      console.log('no mapper for key:', key);
    }
  }
  return mapper;
};
