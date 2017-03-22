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
      exists('single_page.html', cb);
    });
  });

  it('should render pages with `layout: false` or `layout: none` defined.', function(cb) {
    run({
      no_layout: {
        files: {
          'test/actual/no_layout/': ['test/fixtures/pages/nolayout/*.hbs']
        }
      }
    }, function(err) {
      if (err) return cb(err);
      exists(['no_layout/no-layout.html', 'no_layout/no-layout-none.html'], cb);
    });
  });

  it('should allow layouts defined in YFM to be defined without an extension.', function(cb) {
    // TODO: pager helper
    // TODO: default helper
    run({
      options: {
        layouts: [fixtures('layouts/*.hbs')]
      },
      layout_ext: {
        options: {
          layout: 'none', // override default, layout is redefined in YFM
          layoutext: '.hbs'
        },
        files: {
          'test/actual/layout_ext/': ['test/fixtures/pages/layoutext/layoutext.hbs']
        }
      }
    }, function(err) {
      if (err) return cb(err);
      exists(['layout_ext/layoutext.html'], cb);
    });
  });

  it('should flatten nested layouts.', function(cb) {
    run({
      options: {
        layouts: [fixtures('layouts/*.hbs')]
      },
      nested_layouts: {
        options: {
          partials: fixtures('partials/*.hbs'),
          data: fixtures('data/*.{json,yml}'),
          layout: 'one.hbs'
        },
        files: {
          'test/actual/nested_layouts/': ['test/fixtures/pages/nested/*.hbs']
        }
      }
    }, function(err) {
      if (err) return cb(err);
      exists(['nested_layouts/deep-nested-layouts.html', 'nested_layouts/nested-layouts.html'], cb);
    });
  });
});
