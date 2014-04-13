/*
 * Assemble Plugin: assemble-plugin-info
 * https://github.com/doowb/assemble-plugin-info
 * Assemble is the 100% JavaScript static site generator for Node.js, Grunt.js, and Yeoman.
 *
 * Copyright (c) 2014 doowb
 * Licensed under the MIT license.
 */

var options = {
  stages: ['options:before:configuration']
};

module.exports = function(assemble) {

  assemble.registerPlugin('assemble-plugin-info', '', options, function (params, next) {
    console.log('assemble-plugin-info', params.stage);
    next();
  });

};