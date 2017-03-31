/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License (MIT).
 */

var sort = require('sort-object');

module.exports.register = function(Handlebars) {
  'use strict';

  Handlebars.registerHelper('inspect', function(context, options) {
    var hash = options.hash || {};
    var ext = hash.ext || '.html';
    context = JSON.stringify(sort(context), null, 2);

    // Wrap the returned JSON in either markdown code fences
    // or HTML, depending on the extension.
    var md = '\n```json\n' + context + '\n```';
    var html = '<pre><code class="json">\n' + context + '\n</code></pre>';
    var result = switchOutput(ext, md, html);
    return new Handlebars.SafeString(result);
  });
};

function switchOutput(ext, markdown, html) {
  var output;
  switch (ext) {
    // return markdown
    case '.markdown':
    case '.md':
      output = markdown;
      break;

    // return HTML
    case '.html':
    case '.htm':
      output = html;
      break;

    default:
      output = html;
  }
  return output;
}
