require.config({
  paths: {
    'backbone': 'lib/backbone',
    'marionette': 'lib/backbone.marionette.min',
    'bootstrap': 'lib/bootstrap',
    'moment': 'lib/moment.min',
    'underscore': 'lib/underscore',
    'backbone.babysitter': 'lib/backbone.babysitter.min',
    'backbone.wreqr': 'lib/backbone.wreqr.min',
    'jquery': 'lib/jquery',
    'vent': 'lib/vent',
    'runtime': 'templates/runtime'
  }
});

require(['app', 'router'], function (App, Router) {
  // Intialize the routing
  App.addInitializer(function (options) {
    var router = new Router();
  });
  App.start();
});
