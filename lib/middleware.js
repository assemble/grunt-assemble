'use strict';

var matter = require('parser-front-matter');
var utils = require('./utils');

module.exports = function(options) {
  return function(app) {
    if (!this.isApp) return;
    var exts = app.options.engineExtensions || ['hbs', 'md', 'html'];
    var engine = app.options.engine || [];
    var extRe = app.options.extRegex || utils.extRegex(exts, engine);

    app.onLoad(extRe, function(view, next) {
      // view.layout = view.layout || app.options.layout;
      matter.parse(view, function(err) {
        if (err) {
          next(err);
          return;
        }

        copyPaths(view);
        next();
      });
    });
  };
};

function copyPaths(view) {
  var keys = [
    'cwd',
    'base',
    'path',
    'extname',
    'basename',
    'dirname',
    'relative',
    'stem',
    'filename'
  ];

  // trigger getters
  keys.forEach(function(key) {
    view.data[key] = view[key];
  });
}
