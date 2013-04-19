// For my Backbone.js project I like to split out the controller code from the 
// Routers to keep things a little more seperated. This methodology is similar to
// how Rails or and Express app might work.
define(function (require) {
  var session = require('models/session');
  var App = require('app');
  var SignupLayout = require('layouts/signup');
  var HomeLayout = require('layouts/home');
  var Posts = require('collections/posts');

  return {
    
    // Handles the Home route
    index: function () {
      session.auth(function (user) {
        var feed = new Posts();
        feed.fetch();
        var layout = new HomeLayout({ model: session, collection: feed });
        App.content.show(layout);
      });
    },

    // Handles the signup route 
    signup: function () {
      var layout = new SignupLayout({ model: session });
      App.content.show(layout);
    },

    // Handles the signout route
    signout: function () {
      session.auth(function (user) {
        session.logout(function () {
          App.vent.trigger('navigate', '/');
        });
      });
    }

  };
});
