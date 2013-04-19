// This view will just render the user's avatar with his name and a signout 
// link. Because this view is attached to the page via the login event (which is
// setup in the app definition we can't use the App.vent.trigger('navigate') method
// to trigger the page change. So that's we we are calling the Backbone.history.navigate
// manually
define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/dashboard');
  var Backbone = require('backbone');
  var $ = require('jquery');
  return Marionette.ItemView.extend({

    // Setup the template
    template: template,
    
    // Handle the signout click.
    events: {
      'click a': function (e) {
        e.preventDefault();
        Backbone.history.navigate($(e.currentTarget).attr('href'), { trigger: true });
      }
    }

  });
});
