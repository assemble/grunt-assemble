'use strict';

/**
 * Should write a page, with explicit dest file name defined
 */

module.exports = function(grunt) {
  return {
    files: {
      'test/actual/bar.html': ['test/fixtures/pages/foo.hbs']
    }
  };
};
