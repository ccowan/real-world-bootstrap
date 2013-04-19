define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/status');
  var Post = require('models/post');

  return Marionette.ItemView.extend({
    // Set the template to our template function 
    template: template,

    // Set the model passed in the options to the session and create a new
    // Post model
    initialize: function (options) {
      this.session = options.model;
      this.model = new Post();
    },

    // Attach the submit handler to the submit event
    events: {
      'submit form': 'submit'
    },

    // Define the UI elemnts for convenence
    ui: {
      post: '[name=post]'
    },

    // When the user submits a new post we need to save the post then on successful
    // submission we need to trigger the post event with a clone of the model then
    // reset it. So that the form will be ready for a new post.
    submit: function (e) {
      e.preventDefault();
      var self = this;

      var fields = {
        post: this.ui.post.val()
      };

      // Check to make sure the post field is not empty
      if (fields.post) {
        this.model.save(fields, {
          success: function (model) {
            self.trigger('post', model.clone()); 
            self.model.clear();
            self.model.id = null;
            self.ui.post.val('');
          }
        });
      }
    },

    // Instead of serializing this.model we want to serialize this.session
    serializeData: function () {
      return this.session.toJSON();
    }

  });

});
