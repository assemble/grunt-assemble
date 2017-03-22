'use strict';

var path = require('path');
var assert = require('assert');
var exists = require('fs-exists-sync');

var actual = path.resolve.bind(path.resolve, __dirname, '..', 'actual');

module.exports = function(files, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = Object.assign({}, options);
  files = Array.isArray(files) ? files : [files];

  try {
    var len = files.length;
    for (var i = 0; i < len; i++) {
      var fp = actual(files[i]);
      assert(exists(fp), opts.msg || `expected ${fp} to exist`);
    }
  } catch (err) {
    if (typeof cb === 'function') {
      cb(err);
      return;
    }
    throw err;
  }

  if (typeof cb === 'function') {
    cb();
  }
};
