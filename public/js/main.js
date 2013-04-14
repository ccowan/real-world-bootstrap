require.config({
  paths: {
    'backbone': 'lib/backbone',
    'marionette': 'lib/backbone.marionette.min',
    'bootstrap': 'lib/bootstrap',
    'moment': 'lib/moment',
    'underscore': 'lib/underscore',
    'backbone.babysitter': 'lib/backbone.babysitter.min',
    'backbone.wreqr': 'lib/backbone.wreqr.min',
    'jquery': 'lib/jquery',
    'vent': 'lib/vent'
  }
});

require(['router', 'models/session', 'backbone', 'vent'], function (Router, session, Backbone, vent) {

  // Initalize the Router
  var router = new Router();

  // Setup an event to trigger the navigation
  vent.on("navigate", function(url) {
    Backbone.history.navigate(url, {
      trigger: true
    });
  });

  // Start the Backbone Push History
  Backbone.history.start({
    pushState: Modernizr.history,
    silent: true
  });

  // This will correct thing for IE
  if (!Modernizr.history) {
    rootLength = Backbone.history.options.root.length;
    fragment = window.location.pathname.substr(rootLength);
    return Backbone.history.navigate(fragment, {
      trigger: true
    });
  } else {
    return Backbone.history.loadUrl(Backbone.history.getFragment());
  } 
  
});
