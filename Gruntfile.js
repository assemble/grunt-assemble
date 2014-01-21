/*
 * Assemble
 * Created and maintained by Jon Schlinkert and Brian Woodward
 * http://assemble.io
 *
 * Assemble is a full-featured documentation generator,
 * static site generator and component builder. Created
 * from the ground up as a plugin for Grunt.js.
 *
 * Copyright (c) 2013 Upstage
 * Licensed under the MIT License (MIT).
 */

module.exports = function (grunt) {

  // Report elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Metadata for tests
    pkg: grunt.file.readJSON('package.json'),

    // Metadata for banners
    meta: {
      license: '<%= _.pluck(pkg.licenses, "type").join(", ") %>',
      copyright: 'Copyright (c) <%= grunt.template.today("yyyy") %>',
      banner: [
        '/* \n',
        ' * <%= pkg.name %> v<%= pkg.version %> \n',
        ' * http://assemble.io \n',
        ' * \n',
        ' * <%= meta.copyright %>, <%= pkg.author.name %> \n',
        ' * Licensed under the <%= meta.license %> License. \n',
        ' * \n',
        ' */ \n\n'
      ].join('\n')
    },

    /**
     * Lint all JavaScript
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        'lib/**/*.js',
        'tasks/**/*.js',
        'test/**/*.js'
      ]
    },

    /**
     * Run mocha tests.
     */
    mochaTest: {
      tests: {
        options: {
          reporter: 'progress'
        },
        src: ['test/**/*_test.js']
      }
    },

    assemble: {
      options: {
        taskOpts: 'something',
        // plugins: ['lib/plugins/*.js'],
        expand: true,
        cwd: 'node_modules/fixture/handlebars/with-yfm'
      },
      compact: {
        options: {
          targetOpts: 'compact'
        },
        src: ['example.hbs', 'y*.hbs'],
        dest: 'test/actual/'
      },
      filesObj: {
        options: {
          targetOpts: 'filesObj'
        },
        files: {
          'test/actual/example.html': 'example.hbs',
          'test/actual/y.html': ['y*.hbs']
        }
      },
      filesArr: {
        options: {
          targetOpts: 'filesArr'
        },
        files: [
          {
            dest: 'test/actual/',
            src: '**/*.hbs'
          }
        ]
      },
      baz: {
        options: {
          targetOpts: 'baz'
        },
        files: [
          {
            expand: true,
            dest: 'test/actual/',
            src: 'example.hbs'
          },
          {
            expand: true,
            dest: 'test/actual/',
            src: 'yfm-context.hbs'
          },
          {
            expand: true,
            dest: 'test/actual/',
            src: 'yfm.hbs'
          },
          {
            expand: true,
            dest: '/test/actual/',
            src: '**/*.hbs'
          }
        ]
      }
    },

    /**
     * Pull down a list of repos from Github, for the docs
     */
    repos: {
      plugins: {
        options: {
          username: 'assemble',
          include: ['contrib'], exclude: ['grunt', 'example', 'rss']
        },
        files: {
          'docs/plugins.json': ['repos?page=1&per_page=100']
        }
      }
    },

    /**
     * Build the README using metadata from the repos task.
     */
    readme: {
      options: {
        metadata: ['docs/plugins.json']
      }
    },


    /**
     * Before generating any new files,
     * remove files from the previous build
     */
    clean: {
      tests: ['test/actual/**/*']
    },

    /**
     * Watch source files and run tests when changes are made.
     */
    watch: {
      dev: {
        files: ['Gruntfile.js', 'tasks/**/*.js', 'lib/**/*.js', 'test/**/*.js'],
        tasks: ['dev']
      }
    }

  });

  // Load NPM plugins to provide the necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('grunt-repos');
  grunt.loadNpmTasks('grunt-sync-pkg');

  // Load this plugin.
  grunt.loadTasks('tasks');

  // Build
  grunt.registerTask('docs', ['repos', 'readme', 'sync']);

  // Tests to be run.
  grunt.registerTask('test', ['assemble', 'mochaTest']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'test', 'docs']);

  // Dev task.
  grunt.registerTask('dev', ['jshint', 'test', 'watch']);
};