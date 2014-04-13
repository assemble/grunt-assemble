/**
 * Handlebars Helpers: {{relative}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

var relative = require('relative');

module.exports = function (config) {
  var Handlebars = config.Handlebars;
  var helpers = {};

  helpers.unless_eq = function (context, options) {
    if (context === options.hash.compare) {
      return options.inverse(this);
    }
    return options.fn(this);
  };

  return helpers;
};

