define(function (require) {
  var session = require('models/session');
  var App = require('app');
  var SignupLayout = require('layouts/signup');
  var HomeLayout = require('layouts/home');
  var Posts = require('collections/posts');

  return {

    index: function () {
      session.auth(function (user) {
        var feed = new Posts();
        feed.fetch();
        var layout = new HomeLayout({ model: session, collection: feed });
        App.content.show(layout);
      });
    },

    signup: function () {
      var layout = new SignupLayout({ model: session });
      App.content.show(layout);
    },

    signout: function () {
      session.auth(function (user) {
        session.logout(function () {
          App.vent.trigger('navigate', '/');
        });
      });
    }

  };
});
