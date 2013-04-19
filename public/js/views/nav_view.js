define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/nav');
  var $ = require('jquery');
  var App = require('app');

  return Marionette.Layout.extend({
    // Set the template
    template: template,

    // We need to bind the handClick method to the scope of the object
    initialize: function (options) {
      _.bindAll(this, 'handleClick');
    },

    // Define the click event
    events: {
      'click a': 'handleClick'
    },

    // Define the click event handler
    handleClick: function (e) {
      e.preventDefault();
      // Get the link element
      var link = $(e.currentTarget);
      // Get the URL 
      var url = link.attr('href');
      // Get the title
      var title = link.html();
      // Remove the active class from the current item
      this.$('li').removeClass('active');
      // And add it to the new item
      link.parent().addClass('active');
      // Triger the navigate event 
      this.trigger('navigate', url, title); 
    }
  });
});
