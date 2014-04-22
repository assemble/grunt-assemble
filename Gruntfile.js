/*!
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License (MIT)
 */

module.exports = function (grunt) {

  // Report elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    test: grunt.file.readYAML('.assemblerc.yml'),
    config: grunt.file.readJSON('test/fixtures/data/config.json'),

    // Lint all JavaScript
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['Gruntfile.js', 'lib/*.js', 'tasks/*.js', 'test/*.js']
    },

    // Run mocha unit tests.
    mochaTest: {
      tests: {
        options: {reporter: 'spec'},
        src: ['test/*.js']
      }
    },

    // Example config data for "pages_array" and "pages_object" targets
    component: {
      one: "alert"
    },

    assemble: {
      options: {
        flatten: true,
        pkg: '<%= pkg %>',
        test: '<%= test %>',
        config: '<%= config %>',

        taskOpts: 'something',
        assets: '<%= test.assets %>',
        helpers: [
          '<%= test.helpers %>/gist.js',
          '<%= test.helpers %>/pager.js',
          '<%= test.helpers %>/relative.js',
          '<%= test.helpers %>/eachItems.js',
          '<%= test.helpers %>/placeholders.js',
        ],
        layoutdir: '<%= test.layouts %>'
      },
      // Should render pages with `layout: false` or `layout: none` defined
      no_layout: {
        files: {
          '<%= test.actual %>/no_layout/': ['<%= test.pages %>/nolayout/*.hbs']
        }
      },
      // Should allow Layouts defined in YFM to be defined without an extension.
      layout_ext: {
        options: {
          layout: 'none', // override default, layout is redefined in YFM
          layoutext: '.hbs'
        },
        files: {
          '<%= test.actual %>/layout_ext/': ['<%= test.pages %>/layoutext/layoutext.hbs']
        }
      },
      // Should flatten nested layouts
      nested_layouts: {
        options: {
          partials: '<%= test.includes %>/*.hbs',
          layout: 'one.hbs'
        },
        files: {
          '<%= test.actual %>/nested_layouts/': ['<%= test.pages %>/nested/*.hbs']
        }
      },
      compact: {
        options: {
          targetOpts: 'compact'
        },
        src: ['<%= test.components %>/alert.hbs', '<%= test.templates %>/t*.hbs'],
        dest: '<%= test.actual %>/'
      },
      // Should build a single page, with explicit dest page name defined
      single_page: {
        files: {
          '<%= test.actual %>/single_page.html': ['<%= test.pages %>/example.hbs']
        }
      },
      // Should process and add complex YAML front matter to context
      yfm: {
        files: {
          '<%= test.actual %>/yfm/': ['<%= test.pages %>/yfm/*.hbs']
        }
      },
      // Should process pages no YAML front matter defined
      noyfm: {
        files: {
          '<%= test.actual %>/noyfm/': ['<%= test.pages %>/no-yfm.hbs']
        }
      },

      // Should properly calculate relative paths from nested pages
      // to `assets` directory
      assets_base: {
        options: {assets: 'test/assets', assets_base: true},
        files: {
          '<%= test.actual %>/assets_base.html': ['test/fixtures/assets_path/assets.hbs']
        }
      },
      // Should properly calculate relative paths from pages to `assets` directory
      assets_nested: {
        options: {assets: 'test/assets/nested', assets_nested: true},
        files: {
          '<%= test.actual %>/assets_nested.html': ['test/fixtures/assets_path/assets.hbs']
        }
      },
      // Should properly calculate path to `assets` directory when defined
      // with a trailing slash
      assets_trailing_slash: {
        options: {assets: 'test/assets/', assets_trailing_slash: true},
        files: {
          '<%= test.actual %>/assets_trailing_slash.html': ['test/fixtures/assets_path/assets.hbs']
        }
      },
      // Should properly calculate path to `assets` directory when the path
      // begins with `./`
      assets_dot_slash: {
        options: {assets: './test/assets', assets_dot_slash: true},
        files: {
          '<%= test.actual %>/assets_dot_slash.html': ['test/fixtures/assets_path/assets.hbs']
        }
      },
      // Should properly calculate path to `assets` directory when the
      // assets path is blank
      assets_blank_path: {
        options: {assets: '', assets_blank_path: true},
        files: {
          '<%= test.actual %>/assets_blank_path.html': ['test/fixtures/assets_path/assets.hbs']
        }
      },
      // Path construction based on built-in variables
      // Should automatically calculate relative paths correctly
      paths: {
        options: {
          partials: '<%= test.includes %>/*.hbs',
        },
        files: {
          '<%= test.actual %>/paths/': ['<%= test.pages %>/alert.hbs']
        }
      },

      // Pages collections
      pages_array: {
        options: {
          layout: "post.hbs",
          site: {
            title: "A Blog",
            author: "Jon Schlinkert"
          },
          pages: '<%= config.pages.one %>'
        },
        files: {
          '<%= test.actual %>/pages_array/': ['<%= test.pages %>/blog/index.hbs']
        }
      },
      pages_object: {
        options: {
          layout: 'post.hbs',
          site: {
            title: 'Another Blog',
            author: 'Brian Woodward'
          },
          pages: '<%= config.pages.two %>'
        },
        files: {
          '<%= test.actual %>/pages_object/': ['<%= test.pages %>/blog/index.hbs']
        }
      },
      pages_metadata: {
        options: {
          layout: 'post.hbs',
          site: {
            title: 'Another Blog with Meta',
            author: 'Brian Woodward'
          },
          pages: '<%= config.pages.three %>'
        },
        files: {
          '<%= test.actual %>/pages_metadata/': ['<%= test.pages %>/blog/index.hbs']
        }
      },

      filesObj: {
        options: {
          targetOpts: 'filesObj'
        },
        files: {
          '<%= test.actual %>/alert.html': '<%= test.compoents %>/alert.hbs',
          '<%= test.actual %>/t.html': ['<%= test.templates %>/t*.hbs']
        }
      },
      filesArr: {
        options: {
          targetOpts: 'filesArr'
        },
        files: [
          {
            expand: true,
            cwd: '<%= test.templates %>',
            dest: '<%= test.actual %>/',
            src: '**/*.hbs'
          }
        ]
      },
      baz: {
        options: {
          targetOpts: 'baz',
          partials: ['<%= test.includes %>/**/*.hbs']
        },
        files: [
          {
            expand: true,
            cwd: '<%= test.components %>',
            dest: '<%= test.actual %>/',
            src: 'alert.hbs'
          },
          {
            expand: true,
            cwd: '<%= test.templates %>',
            dest: '<%= test.actual %>/',
            src: 'two.hbs'
          },
          {
            expand: true,
            cwd: '<%= test.templates %>',
            dest: '<%= test.actual %>/',
            src: 'three.hbs'
          }
        ]
      }
    },


    /**
     * Targets from the original assemble
     */

    'assemble-regression': {
      options: {
        assets: 'test/assets',
        helpers: ['test/_helpers/*.js'],
        layoutdir: 'test/fixtures/layouts',
        layout: 'default.hbs',
        flatten: true
      },


      // Should register locally-defined custom helpers
      custom_helpers: {
        options: {
          helpers: ['test/_helpers/*.js'],
          // name: '<%= pkg.name %>'
        },
        files: {
          '<%= test.actual %>/custom_helpers/': ['test/fixtures/helpers/{foo,bar,opt}.hbs']
        }
      },
      // Should register and use custom plugins, without a stage defined
      plugin_untitled: {
        options: {
          plugins: ['./test/_plugins/untitled.js']
        },
        files: {
          '<%= test.actual %>/plugin_untitled.html': 'test/fixtures/plugins/untitled.hbs'
        }
      },
      // Should use custom plugins with 'render:pre:pages' stage defined
      plugin_before: {
        options: {
          plugins: ['./test/_plugins/plugin_before.js']
        },
        files: {
          '<%= test.actual %>/plugin_before.html': 'test/fixtures/plugins/before.hbs'
        }
      },
      // Should use custom plugins with 'render:post:pages' stage defined
      plugin_after: {
        options: {
          plugins: ['./test/_plugins/plugin_after.js']
        },
        files: {
          '<%= test.actual %>/plugin_after.html': 'test/fixtures/plugins/after.hbs'
        }
      },
      // Should use custom plugins with 'render:pre:page' stage defined
      plugin_pre_page: {
        options: {
          plugins: ['./test/_plugins/plugin_pre_page.js']
        },
        files: {
          '<%= test.actual %>/plugin_pre_page.html': 'test/fixtures/plugins/after.hbs'
        }
      },
      // Should do nothing for a non-existant plugin
      plugin_none: {
        options: {
          plugins: ['./test/_plugins/not_real.js']
        },
        files: {
          '<%= test.actual %>/not_real.html': 'test/fixtures/plugins/after.hbs'
        }
      },

      // should add isCurrentPage and relativeLink to each page
      // in the pages collection
      plugin_preprocess_page_collection: {
        options: {
          partials: '<%= test.includes %>/*.hbs',
          layout: 'preprocess.hbs',
          pageCollection: {
            preprocess: require('./test/_plugins/page_collection_preprocessing.js')
          }
        },
        files: {
          '<%= test.actual %>/plugin_preprocess/': ['<%= test.pages %>/*.hbs']
        }
      },


      // Should add collections to context, sorted in descending order.
      collections_desc: {
        options: {
          collections: [
            {name: 'pages', inflection: 'page', sortorder: 'DESC'},
            {name: 'tags', inflection: 'tag', sortorder: 'DESC'},
            {name: 'categories', inflection: 'category', sortorder: 'DESC'}
          ]
        },
        files: {
          '<%= test.actual %>/collections/desc/': ['<%= test.pages %>/*.hbs']
        }
      },
      // Should add collections to context, sorted in ascending order.
      collections_asc: {
        options: {
          collections: [
            {name: 'pages', inflection: 'page', sortorder: 'ASC'},
            {name: 'tags', inflection: 'tag', sortorder: 'ASC'},
            {name: 'categories', inflection: 'category', sortorder: 'ASC'}
          ]
        },
        files: {
          '<%= test.actual %>/collections/asc/': ['<%= test.pages %>/*.hbs']
        }
      },
      // Should
      collections_custom: {
        options: {
          collections: [
            {name: 'items', inflection: 'item', sortorder: 'DESC'}
          ]
        },
        files: {
          '<%= test.actual %>/collections/custom/': ['<%= test.pages %>/*.hbs']
        }
      },
      // Should add complex collections and related pages to context
      collections_complex: {
        options: {
          data: ['test/fixtures/data/collections/*.json']
        },
        files: {
          '<%= test.actual %>/collections/complex/': ['<%= test.pages %>/*.hbs']
        }
      }
    },

    /**
     * Before generating any new files,
     * remove files from the previous build
     */
    clean: {
      tests: ['<%= test.actual %>/**/*']
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
  require('load-grunt-tasks')(grunt);

  // Load this plugin.
  grunt.loadTasks('tasks');

  // Tests to be run.
  grunt.registerTask('test', ['assemble', 'mochaTest']);

  // Dev task.
  grunt.registerTask('dev', ['jshint', 'test', 'watch']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'test', 'verb']);
};
