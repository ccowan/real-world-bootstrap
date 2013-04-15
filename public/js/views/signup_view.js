define(function (require) {
  var Marionette = require('marionette');
  var _ = require('underscore');
  var template = require('templates/signup');
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
      // Prevent the default form action
      e.preventDefault();
      
      // Get the  form values
      var user = {
        name: this.$el.find('[name=name]').val(),
        username: this.$el.find('[name=username]').val(),
        email: this.$el.find('[name=email]').val(),
        password: this.$el.find('[name=password]').val()
      }

      // Save the user
      this.model.save(user, {
        success: function (model) {
          vent.trigger('navigate', '');
        }
      });
    }
  });
});
