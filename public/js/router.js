define(function (require) {
  var session = require('models/session');

  return Backbone.Router.extend({
    routes: {
      '': function () {
        session.auth(function (user) {
          // do something interesting
          cosnole.log('home');
        });
      },
      '/signup': function () {
        console.log('signup'); 
      }
    }
  });
});
