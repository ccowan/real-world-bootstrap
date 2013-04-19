define(function (require) {
  var Marionette = require('marionette');
  var _ = require('underscore');
  var template = require('templates/signup');
  var App = require('app');

  return Marionette.ItemView.extend({
    // Set the template to our template function 
    template: template,

    // Bind the scope of the submit handler
    initialize: function (options) {
      _.bindAll(this, 'submit');
    },

    // Attach the submit handler to the submit event
    events: {
      'submit form': 'submit'
    },

    // Define the submit event handler
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

        // Save the new user, trigger the login event and navigate to the homepage.
        success: function (model) {
          App.vent.trigger('login', model);
          App.vent.trigger('navigate', '/');
        },

        // If the endpoint returns an error display the error messages.
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
