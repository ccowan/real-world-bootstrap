define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/signin');
  var vent = require('vent');

  return Marionette.ItemView.extend({
    template: template,

    initialize: function (options) {
      _.bindAll(this, 'submit');
    },

    events: {
      'submit form': 'submit'
    },

    submit: function (e) {
      e.preventDefault();
      var self = this;
      var creds = {
        username: this.$el.find('[name=username]').val(),
        password: this.$el.find('[name=password]').val()
      };
      this.model.login(creds, function (err, model) {
        if (err) {
          self.$el.find('[name=username]').parent().addClass('error');
          self.$el.find('[name=password]').parent().addClass('error');
          self.$el.find('form').before('<div class="alert alert-error">The username or password you supplied is not valid.</div>');
          return;
        }
        vent.trigger('navigate', '/');
      });
    }

  });
});
