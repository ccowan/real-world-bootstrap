define(function (require) {
  var Backbone = require('backbone');
  var vent = require('vent');
  var Session = Backbone.Model.extend({

    urlRoot: '/api/v1/session',

    login: function (creds, done) {
      creds.id = creds.username;
      this.save(creds, {
        success: function (model) {
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
          model.clear();
          model.id = null;
          done();
        }
      });
    },

    auth: function (done) {
      this.fetch({
        success: done,
        error: function () {
          vent.trigger('navigate', '/signup');
        }
      });
    }

  });

  return new Session();
});
