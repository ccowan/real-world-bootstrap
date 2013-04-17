define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/status');
  var Post = require('models/post');

  return Marionette.ItemView.extend({
    template: template,

    initialize: function (options) {
      this.session = options.model;
      this.model = new Post();
    },

    events: {
      'submit form': 'submit'
    },

    ui: {
      post: '[name=post]'
    },

    submit: function (e) {
      e.preventDefault();
      var self = this;

      var fields = {
        post: this.ui.post.val()
      };

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

    serializeData: function () {
      return this.session.toJSON();
    }

  });

});
