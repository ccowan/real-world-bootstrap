define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/signin');
  var App = require('app');

  return Marionette.ItemView.extend({
    // Set the template to our template function  
    template: template,

    // Bind the scople of the object to the submit handler
    initialize: function (options) {
      _.bindAll(this, 'submit');
    },

    // Attach the submit handler to the submit event
    events: {
      'submit form': 'submit'
    },

    // When the user sign's in we need to use the session.login method to authenticate
    // the user instead of creating a new one with save. If they are successful
    // we will navigate to the home page. Other wise we need to display an error.
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
        App.vent.trigger('navigate', '/');
      });
    }

  });
});
