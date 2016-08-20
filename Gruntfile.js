/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License (MIT).
 */

module.exports = function(grunt) {

  // Report elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Metadata for tests
    pkg : grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('test/fixtures/data/config.json'),
    site: grunt.file.readYAML('test/fixtures/data/_site.yml'),

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


    /**
     * Assemble examples/tests
     */
    assemble: {
      options: {
        assets: 'test/assets',
        helpers: ['test/helpers/*.js'],
        layoutdir: 'test/fixtures/layouts',
        layout: 'default.hbs',
        flatten: true,
        data: {
          global1: "globalData1",
          global2: "globalData2"
        }
      },
      // Should render pages with `layout: false` or `layout: none` defined
      no_layout: {
        files: {
          'test/actual/no_layout/': ['test/fixtures/pages/nolayout/*.hbs']
        }
      },
      // Should allow Layouts defined in YFM to be defined without an extension.
      layout_ext: {
        options: {
          layout: 'none', // override default, layout is redefined in YFM
          layoutext: '.hbs'
        },
        files: {
          'test/actual/layout_ext/': ['test/fixtures/pages/layoutext/layoutext.hbs']
        }
      },
      // Should flatten nested layouts
      nested_layouts: {
        options: {
          partials: 'test/fixtures/partials/*.hbs',
          data: 'test/fixtures/data/*.{json,yml}',
          layout: 'one.hbs'
        },
        files: {
          'test/actual/nested_layouts/': ['test/fixtures/pages/nested/*.hbs']
        }
      },
      // Should register locally-defined custom helpers
      custom_helpers: {
        options: {
          helpers: ['test/helpers/*.js'],
          name: '<%= pkg.name %>'
        },
        files: {
          'test/actual/custom_helpers/': ['test/fixtures/helpers/{foo,bar,opt}.hbs']
        }
      },
      // Should register and use custom plugins, without a stage defined
      plugin_untitled: {
        options: {
          plugins: ['./test/plugins/untitled.js']
        },
        files: {
          'test/actual/plugin_untitled.html': 'test/fixtures/plugins/untitled.hbs'
        }
      },
      // Should use custom plugins with 'render:pre:pages' stage defined
      plugin_before: {
        options: {
          plugins: ['./test/plugins/plugin_before.js']
        },
        files: {
          'test/actual/plugin_before.html': 'test/fixtures/plugins/before.hbs'
        }
      },
      // Should use custom plugins with 'render:post:pages' stage defined
      plugin_after: {
        options: {
          plugins: ['./test/plugins/plugin_after.js']
        },
        files: {
          'test/actual/plugin_after.html': 'test/fixtures/plugins/after.hbs'
        }
      },
      // Should use custom plugins with 'render:pre:page' stage defined
      plugin_pre_page: {
        options: {
          plugins: ['./test/plugins/plugin_pre_page.js']
        },
        files: {
          'test/actual/plugin_pre_page.html': 'test/fixtures/plugins/after.hbs'
        }
      },
      // Should do nothing for a non-existant plugin
      plugin_none: {
        options: {
          plugins: ['./test/plugins/not_real.js']
        },
        files: {
          'test/actual/not_real.html': 'test/fixtures/plugins/after.hbs'
        }
      },
      // should add isCurrentPage and relativeLink to each page
      // in the pages collection
      plugin_preprocess_page_collection: {
        options: {
          partials: ['test/fixtures/partials/*.hbs'],
          data: 'test/fixtures/data/*.{json,yml}',
          layout: 'preprocess.hbs',
          pageCollection: {
            preprocess: require('./test/plugins/page_collection_preprocessing.js')
          }
        },
        files: {
          'test/actual/plugin_preprocess/': ['test/fixtures/pages/*.hbs']
        }
      },
      // Path construction based on built-in variables
      // Should automatically calculate relative paths correctly
      paths: {
        options: {
          partials: 'test/fixtures/partials/*.hbs',
          data: 'test/fixtures/data/*.{json,yml}'
        },
        files: {
          'test/actual/paths/': ['test/fixtures/pages/*.hbs']
        }
      },
      // Should build a single page, with explicit dest page name defined
      single_page: {
        files: {
          'test/actual/single_page.html': ['test/fixtures/pages/example.hbs']
        }
      },
      // Should process and add complex YAML front matter to context
      yfm: {
        options: {
          data: 'test/fixtures/data/*.{json,yml}'
        },
        files: {
          'test/actual/yfm/': ['test/fixtures/pages/yfm/*.hbs']
        }
      },
      // Should process pages no YAML front matter defined
      noyfm: {
        options: {
          data: 'test/fixtures/data/*.{json,yml}'
        },
        files: {
          'test/actual/noyfm/': ['test/fixtures/pages/no-yfm.hbs']
        }
      },
      // Should properly calculate relative paths from nested pages
      // to `assets` directory
      assets_base: {
        options: {assets: 'test/assets', assets_base: true},
        files: {
          'test/actual/assets_base.html': ['test/fixtures/assets_path/assets.hbs']
        }
      },
      // Should properly calculate relative paths from pages to `assets` directory
      assets_nested: {
        options: {assets: 'test/assets/nested', assets_nested: true},
        files: {
          'test/actual/assets_nested.html': ['test/fixtures/assets_path/assets.hbs']
        }
      },
      // Should properly calculate path to `assets` directory when defined
      // with a trailing slash
      assets_trailing_slash: {
        options: {assets: 'test/assets/', assets_trailing_slash: true},
        files: {
          'test/actual/assets_trailing_slash.html': ['test/fixtures/assets_path/assets.hbs']
        }
      },
      // Should properly calculate path to `assets` directory when the path
      // begins with `./`
      assets_dot_slash: {
        options: {assets: './test/assets', assets_dot_slash: true},
        files: {
          'test/actual/assets_dot_slash.html': ['test/fixtures/assets_path/assets.hbs']
        }
      },
      // Should properly calculate path to `assets` directory when the
      // assets path is blank
      assets_blank_path: {
        options: {assets: '', assets_blank_path: true},
        files: {
          'test/actual/assets_blank_path.html': ['test/fixtures/assets_path/assets.hbs']
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
          'test/actual/collections/desc/': ['test/fixtures/pages/*.hbs']
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
          'test/actual/collections/asc/': ['test/fixtures/pages/*.hbs']
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
          'test/actual/collections/custom/': ['test/fixtures/pages/*.hbs']
        }
      },
      // Should add complex collections and related pages to context
      collections_complex: {
        options: {
          data: ['test/fixtures/data/collections/*.json']
        },
        files: {
          'test/actual/collections/complex/': ['test/fixtures/pages/*.hbs']
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
          'test/actual/pages_array/': ['test/fixtures/pages/blog/index.hbs']
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
          'test/actual/pages_object/': ['test/fixtures/pages/blog/index.hbs']
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
          'test/actual/pages_metadata/': ['test/fixtures/pages/blog/index.hbs']
        }
      },
      // Using glob pattern for layouts
      glob_layout: {
        options: {
          layouts: 'test/fixtures/layouts/**/*.hbs',
          layoutdir: undefined
        },
        files: {
          'test/actual/globlayout/simple': ['test/fixtures/pages/globlayout/globlayout.hbs']
        }
      },
      // Using glob pattern for layouts
      glob_layout_multi: {
        options: {
          layouts: ['test/fixtures/layouts/*.hbs', 'test/fixtures/layouts/globlayout/**/*.hbs']
        },
        files: {
          'test/actual/globlayout/multi': ['test/fixtures/pages/globlayout/globlayout.hbs']
        }
      },
      // Should process pages no YAML front matter defined
      noyfmdata: {
        options: {
          data: {
            one: "1-one",
            two: "2-two",
            three: "3-three",
            global1: "override global1 data via task option"
          }
        },
        files: {
          'test/actual/noyfm/no-yfm-data.html': ['test/fixtures/pages/no-yfm-data.hbs']
        }
      },
      // Should process pages no YAML front matter defined
      noyfmdatafile: {
        options: {
          data: 'test/fixtures/data/data.yml'
        },
        files: {
          'test/actual/noyfm/no-yfm-datafile.html': ['test/fixtures/pages/no-yfm-data.hbs']
        }
      }
    },

    // Example config data for "pages_array" and "pages_object" targets
    component: {
      one: "alert"
    },

    /**
     * Before generating any new files,
     * remove files from the previous build
     */
    clean: {
      tests: ['test/actual/**/*']
    }
  });

  // Load NPM plugins to provide the necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-sync-pkg');
  grunt.loadNpmTasks('grunt-verb');

  // Load this plugin.
  grunt.loadTasks('tasks');

  // Build
  grunt.registerTask('docs', ['verb', 'sync']);

  // Tests to be run.
  grunt.registerTask('test', ['assemble', 'mochaTest']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'test', 'docs']);
};