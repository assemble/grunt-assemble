'use strict';

var debug = require('debug')('assemble:grunt-assemble');
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

    debug('engine:', arguments);
    var ext = formatExt(val);
    var engine = knownEngines[ext];
    app.option('engine', ext);

    if (typeof engine === 'undefined') {
      console.log('engine "%s" is not a known engine, you\'ll need to register it first', engine);
      next();
      return;
    }

    tryRequire(engine, function(err, fn) {
      if (err) {
        return next(err);
      } else if (fn) {
        app.engine(ext, fn);
        return next();
      } else {

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
      }
    });
  };
};

function formatExt(ext) {
  if (ext.charAt(0) === '.') {
    return ext.slice(1);
  }
  return ext;
}

function tryRequire(name, cb) {
  try {
    cb(null, require(name));
    return;
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      cb(err);
      return;
    }
  }
  cb();
}
