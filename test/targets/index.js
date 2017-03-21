'use strict';

module.exports = function(grunt) {
  var files = require('export-files')(__dirname);
  var targets = {};
  for (var key in files) {
    targets[key] = files[key](grunt);
  }
  return targets;
};
