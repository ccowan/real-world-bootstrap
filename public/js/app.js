define(function (require) {
  var Marionette = require('marionette');
  var Backbone = require('backbone');
  var DashboardView = require('views/dashboard_view');
  
  // Add the application
  var App = new Marionette.Application();

  // Add the regions
  App.addRegions({
    content: '#content',
    dashboard: '#dashboard'
  });

  // Setup an event to trigger the navigation
  App.vent.on("navigate", function(url) {
    Backbone.history.navigate(url, {
      trigger: true
    });
  });

  // We need to show the dashboard when a user is logged in
  App.vent.on('login', function (user) {
    var dashboard = new DashboardView({ model: user }); 
    App.dashboard.show(dashboard);
  });

  // We need hide the dashboard when the user is logged out
  App.vent.on('logout', function () {
    App.dashboard.close();
  });

  // Start Backbone.history upon initialization
  App.on('start', function () {

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

  return App;

});
