define(function (require) {
  var home = require('controllers/home');

  return Backbone.Router.extend({
    routes: {
      '': home.index,
      'signup': home.signup,
      'signout': home.signout
    }
  });
});
