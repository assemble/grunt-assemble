'use strict';

require('mocha');
var run = require('./support/run');

describe('test', function() {
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
