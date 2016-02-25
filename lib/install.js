'use strict';

var inquirer = require('inquirer2');
var utils = require('./utils');

module.exports = function(app, message, options, cb) {
  var opts = utils.extend({force: true}, options);
  var modules = opts.modules || [];

  var questions = inquirer();
  var question = opts;
  opts.message = opts.message || message;
  opts.name = 'install';
  opts.type = 'confirm';

  questions.prompt(question, function(answer) {
    if (answer.install) {
      install(modules, cb);
    } else {
      cb();
    }
  });
};

function install(names, cb) {
  utils.commands({
    args: ['install', '-D', '--silent', names],
    cmd: 'npm'
  }, cb);
}
