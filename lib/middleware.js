'use strict';

var matter = require('parser-front-matter');
var utils = require('./utils');

module.exports = function(app) {
  var extRe = app.options.extRegex || new RegExp('\\.' + app.options.engine);

  app.onLoad(extRe, function(view, next) {
    matter.parse(view, next);
  });

  app.preRender(extRe, function(view, next) {
    copyPaths(view);
    next();
  });

  app.preLayout(extRe, function(view, next) {
    view.layout = view.layout || app.options.layout;
    next();
  });
};


function copyPaths(view) {
  var keys = [
    'cwd', 'base', 'path', 'extname',
    'basename', 'dirname', 'relative',
    'stem', 'filename'
  ];

  // trigger getters
  keys.forEach(function(key) {
    view.data[key] = view[key];
  });
}
