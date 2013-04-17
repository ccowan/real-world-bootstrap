define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/layouts/home');
  var StatusView = require('views/status_view');
  var NavView = require('views/nav_view');
  var FeedView = require('views/feed_view');

  return Marionette.Layout.extend({
    template: template,
    initialize: function (options) {
      this.on('render', function (view) {
        var navView = new NavView();
        view.nav.show(navView);
        var statusView = new StatusView({ model: options.model});
        view.status.show(statusView);  
        var feedView = new FeedView({ collection: options.collection });
        view.feed.show(feedView);
        statusView.on('post', function (model) {
          if (!options.collection.url.match(/mentions/)) {
            options.collection.unshift(model);
          }
        });
        navView.on('navigate', function (url, title) {
          options.collection.url = url;
          options.collection.fetch({
            reset: true
          });
          feedView.$('h3').html(title);
        });
      });
    },
    regions: {
      nav: '#nav',
      status: '#status',
      feed: '#feed'
    }
  });

});
