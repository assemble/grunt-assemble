/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('markdown', require('helper-markdown')());
  Handlebars.registerHelper('md', require('helper-md').sync);
};
