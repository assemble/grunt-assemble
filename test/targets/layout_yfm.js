'use strict';

/**
 * Should use a layout defined in front-matter
 */

module.exports = function(grunt) {
  return {
    options: {
      layouts: 'test/fixtures/layouts/*.hbs'
    },
    files: {
      'test/actual/': ['test/fixtures/pages/layout_yfm.hbs']
    }
  };
};
