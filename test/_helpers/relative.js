/**
 * Handlebars Helpers: {{relative}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

var relative = require('relative');

module.exports = function (config) {
  var helpers = {};

  helpers.relative = function (a, b) {
    return relative(a, b || process.cwd());
  };

  return helpers;
};

