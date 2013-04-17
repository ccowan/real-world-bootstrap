define(function (require) {
  var session = require('models/session');
  var App = require('app');
  var SignupLayout = require('layouts/signup');
  var HomeLayout = require('layouts/home');

  return {
    index: function () {
      session.auth(function (user) {
        var layout = new HomeLayout();
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
