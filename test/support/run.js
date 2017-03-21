'use strict';

var grunt = require('grunt');

module.exports = function(assembleConfig, cb) {
  grunt.initConfig({
    assemble: assembleConfig
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['assemble']);

  grunt.tasks(['assemble'], {gruntfile: false}, cb);
};
