'use strict';

var utils = module.exports;

utils.extend = require('extend-shallow');
utils.commands = require('spawn-commands');
utils.isObject = require('isobject');
utils.get = require('get-value');

/**
 * Plugins
 */

utils.questions = require('base-questions');
