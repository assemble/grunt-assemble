/**
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */


module.exports = function (assemble) {

  var middleware = function(params, next) {
    params.page.content = "W00T!!!";
    next();
  };

  // export options
  middleware.event = 'render:pre:page';

  return {
    'test-middleware': middleware
  };
};
