'use strict';

require('mocha');
var path = require('path');
var del = require('delete');
var run = require('./support/run');
var exists = require('./support/exists');

var fixtures = path.join.bind(path.join, __dirname, 'fixtures');
var actual = path.join.bind(path.join, __dirname, 'actual');

describe('test', function() {
  afterEach(function(cb) {
    del(actual(), cb);
  });

  it('should run a config', function(cb) {
    run({
      single_page: {
        files: {
          'test/actual/single_page.html': [fixtures('pages/example.hbs')]
        }
      }
    }, function(err) {
      if (err) return cb(err);
      exists(actual('single_page.html'), cb);
    });
  });

  it('should run a config', function(cb) {
    run({
      single_page: {
        files: {
          'test/actual/single_page.html': ['test/fixtures/pages/example.hbs']
        }
      }
    }, cb);
  });
});
