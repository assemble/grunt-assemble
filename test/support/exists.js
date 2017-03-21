'use strict';

var assert = require('assert');
var exists = require('fs-exists-sync');

module.exports = function(fp, msg, cb) {
  if (typeof msg === 'function') {
    cb = msg;
    msg = '';
  }

  msg = msg || `expected ${fp} to exist`;
  try {
    assert(exists(fp), msg);
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
