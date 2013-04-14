define(function (require) {
  var Backbone = require('backbone');
  var vent = require('vent');
  var Session = Backbone.Model.extend({

    urlRoot: '/api/v1/session',
    idAttribute: 'username',

    login: function (creds) {
      this.save(creds, {
        success: function () { }
      });
    },

    logout: function () {
      var self = this;
      this.destory({
        success: function (model, resp) {
          model.clear();
          model.id = null;
        }
      });
    },

    auth: function (callback) {
      this.fetch({
        success: function (model) {
          callback(null, model);
        },
        error: function () {
          vent.trigger('navigate', '/signup');
        }
      });
    }

  });

  return new Session();
});
