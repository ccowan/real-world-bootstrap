define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/empty_feed');
  return Marionette.ItemView.extend({
    template: template
  });
});
