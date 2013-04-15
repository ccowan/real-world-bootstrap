define(function (require) {
  var session = require('models/session');
  var Marionette = require('marionette');
  var stage = new Marionette.Region({ el: $('.content') });
  var vent = require('vent');
  var SignupLayout = require('layouts/signup');

  return {
    index: function () {
      session.auth(function (user) {
        console.log('home');
      });
    },
    signup: function () {
      var layout = new SignupLayout({ model: session });
      stage.show(layout);
    },
    signout: function () {
      session.auth(function (user) {
        session.logout(function () {
          vent.trigger('navigate', '/');
        });
      });
    }
  };
});
