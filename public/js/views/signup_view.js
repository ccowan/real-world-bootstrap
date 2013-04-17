define(function (require) {
  var Marionette = require('marionette');
  var _ = require('underscore');
  var template = require('templates/signup');
  var App = require('app');

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
      var self = this;
      this.model.save(user, {
        success: function (model) {
          App.vent.trigger('login', model);
          App.vent.trigger('navigate', '');
        },
        error: function (model, resp) {
          var data = JSON.parse(resp.responseText);
          var fields = _.keys(data);
          var errors = _.values(data);
          var partial = $('<div class="alert alert-error"></div>');
          _.each(errors, function (error) {
            partial.append('<div>'+error+'</div>');
          });
          _.each(fields, function (field) {
            self.$el.find('[name='+field+']').parent().addClass('error');
          });
          self.$el.find('form').before(partial); 
        }
      });
    }
  });
});
