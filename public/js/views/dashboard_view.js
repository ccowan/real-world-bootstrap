define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/dashboard');
  var Backbone = require('backbone');
  var $ = require('jquery');

  return Marionette.ItemView.extend({
    template: template,
    events: {
      'click a': function (e) {
        e.preventDefault();
        Backbone.history.navigate($(e.currentTarget).attr('href'), { trigger: true });
      }
    }
  });
});
