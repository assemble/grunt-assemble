
module.exports = function(app) {
  var exts = app.options.exts || ['md', 'hbs', 'html'];

  /**
   * Default engine
   */

  app.engine(exts, require('engine-handlebars'));

  /**
   * Middleware for parsing front matter
   */

  app.onLoad(utils.extRegex(exts), function(view, next) {
    // check options inside the middleware to account for options defined after init
    if (view.options.frontMatter === false) {
      next();
      return;
    }
    if (app.options.frontMatter === false) {
      next();
      return;
    }
    utils.matter.parse(view, next);
  });

  /**
   * Load default plugins. Built-in plugins can be disabled
   * on the `assemble` options.
   *
   * ```js
   * var app = assemble({
   *   plugins: {
   *     loader: false,
   *     store: false
   *   }
   * });
   * ```
   */

  enable('logger', plugins.logger);
  enable('loader', plugins.loader);
  enable('config', plugins.config);
  enable('argv', plugins.argv);
  enable('cli', plugins.cli);

  function enable(name, fn) {
    if (app.option('plugins') === false) return;
    if (app.option('plugins.' + name) !== false) {
      app.use(fn());
    }
  }

  /**
   * Built-in view collections
   *  | partials
   *  | layouts
   *  | pages
   */

  app.create('partials', {
    engine: app.options.engine || 'hbs',
    viewType: 'partial',
    renameKey: function(fp) {
      return path.basename(fp, path.extname(fp));
    }
  });

  app.create('layouts', {
    engine: app.options.engine || 'hbs',
    viewType: 'layout',
    renameKey: function(fp) {
      return path.basename(fp, path.extname(fp));
    }
  });

  app.create('pages', {
    engine: app.options.engine || 'hbs'
  });
};
