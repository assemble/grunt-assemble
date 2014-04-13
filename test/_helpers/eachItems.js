/**
 * Handlebars Helper: {{eachItems}}
 * Based on: https://github.com/wycats/handlebars.js/blob/master/lib/handlebars/base.js#L95-L131
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

module.exports = function (config) {
  var Handlebars = config.Handlebars;
  var helpers = {};

  helpers.eachItems = function (context, options) {
    var fn = options.fn;
    var inverse = options.inverse;
    var i = 0;
    var ret = "";
    var data;

    if (_.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = Handlebars.createFrame(options.data);
    }

    if (context && typeof context === 'object') {
      if (_.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (data) {
            data.index  = i;
            data.number = i + 1;
            data.first  = (i === 0);
            data.prev   = i - 1;
            data.next   = i + 1;
            data.last   = (i === (context.length - 1));
          }
          ret = ret + fn(context[i], {data: data});
        }
      } else {
        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            if (data) {
              data.key = key;
            }
            ret = ret + fn(context[key], {
              data: data
            });
            i++;
          }
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  };

  return helpers;
};