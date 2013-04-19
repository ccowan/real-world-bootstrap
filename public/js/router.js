define(function (require) {
  var home = require('controllers/home');

  // Since we are using Backbone 1.0 we are now able to seperate the routing
  // from the controllers.
  return Backbone.Router.extend({
    routes: {
      '': home.index,
      'signup': home.signup,
      'signout': home.signout
    }
  });
});
