/**
 * Handlebars Helpers: {{gist}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

module.exports = function (config) {
  var Handlebars = config.Handlebars;
  var helpers = {};

  helpers.gist = function (id, file) {
    file = file || '';
    id = Handlebars.Utils.escapeExpression(id);
    var result = '<script src="https://gist.github.com/' + id + '.js"></script>';
    return new Handlebars.SafeString(result);
  };

  return helpers;
};

