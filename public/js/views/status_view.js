define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/status');

  return Marionette.ItemView.extend({
    template: template
  });

});
