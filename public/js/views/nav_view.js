define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/nav');
  var $ = require('jquery');
  var App = require('app');

  return Marionette.Layout.extend({
    template: template,
    initialize: function (options) {
      _.bindAll(this, 'handleClick');
    },
    events: {
      'click a': 'handleClick'
    },
    handleClick: function (e) {
      e.preventDefault();
      var link = $(e.currentTarget);
      var url = link.attr('href');
      var title = link.html();
      this.$('li').removeClass('active');
      link.parent().addClass('active');
      this.trigger('navigate', url, title); 
    }
  });
});
