'use strict';

var loader = require('assemble-loader');
var questions = require('base-questions');
var namespace = require('namespace-context');
var lib = require('export-files')(__dirname);

module.exports = function(options) {
  return function(app) {
    if (!this.isApp) return;

    // load config options onto `app.options`
    this.option(options);
    this.engine('hbs', require('engine-handlebars'));
    this.option('engine', 'hbs');

    this.use(questions());
    this.use(namespace('page'));
    this.use(lib.collections());
    this.use(lib.middleware());
    this.use(loader());
  };
};
