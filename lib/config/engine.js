'use strict';

var debug = require('debug')('grunt-assemble');
var install = require('../install');
var utils = require('../utils');

var knownEngines = {
  'hbs': 'engine-handlebars',
  'tmpl': 'engine-base',
  '*': 'engine-base'
};

module.exports = function(app) {
  return function(val, key, config, next) {
    if (!val) {
      app.engine('hbs', require('engine-handlebars'));
      app.option('engine', 'hbs');
      next();
      return;
    }

    debug('engine:', val);
    var ext = utils.formatExt(val);
    var engine = knownEngines[ext];
    app.option('engine', ext);

    if (typeof engine === 'undefined') {
      console.log('Engine "%s" is not a known engine', engine);
      console.log('You will need to register it first');
      next();
      return;
    }

    tryRequire(engine, function(err, fn) {
      if (err) {
        next(err);
        return;
      }

      if (fn) {
        app.engine(ext, fn);
        next();
        return;
      }

      var msg = '"' + engine + '" must be installed. Want to do that before continuing?';
      install(app, msg, {modules: [engine]}, function(err) {
        if (err) {
          next(err);
          return;
        }

        tryRequire(engine, function(err, fn) {
          if (err) {
            next(err);
            return;
          }

          if (fn) {
            app.engine(ext, fn);
            next();
            return;
          }

          next();
        });
      });
    });
  };
};

function tryRequire(name, cb) {
  try {
    cb(null, require(name));
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      cb(err);
      return;
    }
  }
  cb();
}
