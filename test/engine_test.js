/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License (MIT).
 */

var assembleEngine  = require('../lib/engine');
var expect          = require('chai').expect;


var pluginParams = {
  grunt: require('grunt')
};

describe('Loading default handlebars engine', function() {

  it('loads handlebars engine', function(done) {
    done();
  });


  it('compiles a handlebars template', function(done) {
    var engine = assembleEngine.load('handlebars');
    var template;
    engine.compile('{{foo}}', {}, function(err, tmpl) {
      if(err) {
        return done(err);
      }
      template = tmpl;
      done();
    });
  });

  it('renders a template', function(done) {
    var engine = assembleEngine.load('handlebars');
    var expected = 'bar';
    engine.compile('{{baz}}', {}, function(err, tmpl) {
      if(err) {
        return done(err);
      }
      engine.render(tmpl, {baz: 'bar'}, function(err, content) {
        if(err) {
          return done(err);
        }
        expect(content).to.equal(expected);
        done();
      });
    });
  });

  describe('Loading custom helpers', function() {

    var runTest = function(engine, done) {
      var expected = '<!-- foo -->\n<!-- bar -->';
      engine.compile("{{{bar 'bar'}}}", {}, function(err, tmpl) {
        if(err) {
          return done(err);
        }
        engine.render(tmpl, {}, function(err, content) {
          if(err) {
            return done(err);
          }
          expect(content).to.equal(expected);
          done();
        });
      });
    };

    it('loads a custom helper from a file path', function(done) {
      var engine = assembleEngine.load('handlebars');
      engine.init({
        helpers: './test/helpers/helpers.js'
      }, pluginParams);
      runTest(engine, done);
    });

    it('loads a custom helper from a glob pattern', function(done) {
      var engine = assembleEngine.load('handlebars');
      engine.init({
        helpers: './test/helpers/helpers.js'
      }, pluginParams);
      runTest(engine, done);
    });


    it('loads a custom helper from the given path', function(done) {
      var engine = assembleEngine.load('handlebars');
      engine.init({helpers: './test/helpers/*.js'}, pluginParams);
      var expected = '<!-- bar -->';

      engine.compile("{{{foo 'bar'}}}", {}, function(err, tmpl) {
        if(err) {
          return done(err);
        }
        engine.render(tmpl, {}, function(err, content) {
          if(err) {
            return done(err);
          }
          expect(content).to.equal(expected);
          done();
        });
      });
    });

  });
});
