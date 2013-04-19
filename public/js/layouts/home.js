define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/layouts/home');
  var StatusView = require('views/status_view');
  var NavView = require('views/nav_view');
  var FeedView = require('views/feed_view');

  return Marionette.Layout.extend({
    
    // Since we are using a template that can take just the data as an argument
    // we just need to set the template attribute to our actual template function
    template: template,

    // Upon initialization we need to attach a handler to the layout's "render"
    // event that will initlaize the sub views and attach then to the layout's
    // regions. This will create a cascading effect when the layout is attached
    // to the stage.
    initialize: function (options) {

      // Attach a handler for the render event
      this.on('render', function (view) {

        // Initalize the NavView and attach it to the nav region
        var navView = new NavView();
        view.nav.show(navView);

        // Initialze the StatusView and attach it to the status region
        var statusView = new StatusView({ model: options.model});
        view.status.show(statusView);  

        // Initialzie the FeedView and attach it to the feed region
        var feedView = new FeedView({ collection: options.collection });
        view.feed.show(feedView);

        // When a users creates a new post with the StatusView, the status view
        // will save the post to the server then trigger an event with that new
        // post as the argument. We need to attach a handler to take that post
        // and add it to the collection. Since our posts are in newist to oldest
        // we need to add it to the begining of the stack.
        statusView.on('post', function (model) {
          if (!options.collection.url.match(/mentions/)) {
            options.collection.unshift(model);
          }
        });

        // When a user clicks on a link in the NavView we need to change the URL
        // for the collection and fetch the new posts, and reset the feed. We are
        // also going to chang he feed title.
        navView.on('navigate', function (url, title) {

          // Reset the feed view
          feedView.reset();

          // Change the URL to the new url
          options.collection.url = url;
          options.collection.fetch({
            reset: true
          });

          // Change the feed title
          feedView.$('h3').html(title);
        });
      });
    },

    // Define the regions for the layout.
    regions: {
      nav: '#nav',
      status: '#status',
      feed: '#feed'
    }
  });

});
