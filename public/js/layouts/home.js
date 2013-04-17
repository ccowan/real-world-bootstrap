define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/layouts/home');
  var StatusView = require('views/status_view');

  return Marionette.Layout.extend({
    template: template,
    intalize: function (options) {
      this.on('render', function (view) {
        var statusView = new StatusView();
        view.status.show(statusView);  
      });
    },
    regions: {
      status: '#status',
      feed: '#feed'
    }
  });

});
