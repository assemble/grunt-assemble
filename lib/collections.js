'use strict';

module.exports = function(options) {
  return function(app) {
    if (!this.isApp) return;
    app.create('partials', {viewType: 'partial'});
    app.create('layouts', {viewType: 'layout'});
    app.create('pages');
  };
};
