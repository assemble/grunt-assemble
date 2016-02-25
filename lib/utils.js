'use strict';

var path = require('path');
var utils = module.exports;

utils.merge = require('mixin-deep');
utils.extend = require('extend-shallow');
utils.commands = require('spawn-commands');
utils.isObject = require('isobject');
utils.get = require('get-value');

/**
 * Plugins
 */

utils.questions = require('base-questions');

utils.dest = function(app, files) {
  return function(file) {
    if (files.dest[files.dest.length - 1] !== '/') {
      var dest = path.dirname(files.dest);
      file.basename = path.basename(files.dest);
      file.base = path.resolve(dest);
    } else {
      file.base = path.resolve(files.dest);
    }
    file.extname = app.options.ext;
    file.path = path.resolve(file.base, file.basename);
    return file.base;
  };
};

utils.formatExt = function(ext) {
  if (ext.charAt(0) === '.') {
    return ext.slice(1);
  }
  return ext;
};

utils.filename = function(fp) {
  return path.basename(fp, path.extname(fp));
};

utils.renameKey = function(stripExt) {
  return function(key, file) {
    if (stripExt === true) {
      return file ? file.stem : utils.filename(key);
    }
    return file ? file.basename : path.basename(key);
  };
};
