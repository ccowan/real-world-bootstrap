// For our client side authentication we are using the the session model to do
// all the dirty work. There are three convience methods added to the model for
// handling the login, logout and auth.
define(function (require) {
  var Backbone = require('backbone');
  var App = require('app');

  var Session = Backbone.Model.extend({
 
    urlRoot: '/api/v1/session',

    // Then will send the credentials to the server and call the "node" style
    // callback when it has successfuly authenticated the user.
    login: function (creds, done) {
      // We need to set the id as the username so that we trick the model into
      // sending a put request for the authentication
      creds.id = creds.username;
      this.save(creds, {
        success: function (model) {
          App.vent.trigger('login', model);
          done(null, model);
        },
        error: function (xhr) {
          done(new Error());
        }
      });
    },

    // This will send a delete request to the server to destroy the session.
    logout: function (done) {
      var self = this;
      this.destroy({
        wait: true,
        success: function (model, resp) {
          App.vent.trigger('logout', false);
          model.clear();
          model.id = null;
          done();
        }
      });
    },

    // This will fetch the current session. If it's successful it will call the 
    // callback with the model. If it's not successful it will navigate the page
    // to the /signup url
    auth: function (done) {
      this.fetch({
        success: function (model) {
          App.vent.trigger('login', model);
          done(null, model);
        },
        error: function () {
          App.vent.trigger('navigate', '/signup');
        }
      });
    }

  });

  // We are going to treat this model as signleton-like; so instead of returning the
  // model we will return an instance of it.
  return new Session();
});
