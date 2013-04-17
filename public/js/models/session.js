define(function (require) {
  var Backbone = require('backbone');
  var App = require('app');

  var Session = Backbone.Model.extend({

    urlRoot: '/api/v1/session',

    login: function (creds, done) {
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

  return new Session();
});
