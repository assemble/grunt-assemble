
### Breaking changes between versions `0.5.0` and `0.6.0`

Version 6 is using [assemble-handlebars][] version `0.4.0` which updates [handlebars-helpers][] to version `0.6.0`. Due to this update, there are some breaking changes with how some helpers are loaded and some missing/added helpers.

The following list contains the breaking changes that we have noticed that may require updates to existing templates.

**helpers loaded from package.json**

Any helpers declared in `dependencies` or `devDependencies` and have their name in the `keywords` property will no longer be loaded automatically. To load the helpers, just include the package name in the `helpers` option for your `grunt-assemble` target:

```js
assemble: {
  options: {
    helpers: ['handlebars-helper-eachitems']
  }
}
```

**new path helpers**

Helpers have been added that map to methods on the built-in `path` module. Some of these helpers are also properties that `grunt-assemble` adds automatically to `page` properties. To use the page property, use the `this` keyword before the property name. To use the helper, use it like any other helper.

```handlebars
{{! page property "basename" }}
{{this.basename}}

{{! new helper "basename" }}
{{basename this.path}}
```

**missing helper "inspect"**

The "inspect" helper has been removed from `handlebars-helpers`. The test fixtures in this project use the "inspect" helper so it has been recreated [here](./test/helpers/logging.js).

**missing helper "unless_eq"**

The "unless_eq" helper has been renamed to "unlessEq".

**missing helper "md" or "markdown"**

There is a bug in `handlebars-helpers@0.6` that causes the `md` and `markdown` helpers to not be registered correctly. This has been fixed in newer versions of `handlebars-helpers`, however those changes have made it here yet. There is currently a refactor of `grunt-assemble` that will include the fix, but for now, the following is a work-around:

Create a file and register the helpers manually:

```js
// helpers/markdown.js
module.exports.register = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('markdown', require('helper-markdown')());
  Handlebars.registerHelper('md', require('helper-md').sync);
};
```

```js
// Gruntfile.js
assemble: {
  options: {
    helpers: ['./helpers/*.js']
  }
}
```

**handlebars 4 changed how context depths are handled**

`assemble-handlebars` is also using a newer version of handlebars that changed how the depth context is handled. Some of the block helpers that would create a new depth, no longer create the depth. This requires changing some templates that use the `{{../}}` syntax to reduce the amount of `../` segments used. This can be seen in block helpers that don't modify the context, like `{{#if}}{{/if}}` and `{{#is}}{{/is}}`.


[assemble-handlebars]: https://github.com/assemble/assemble-handlebars
[handlebars-helpers]: https://github.com/assemble/handlebars-helpers
