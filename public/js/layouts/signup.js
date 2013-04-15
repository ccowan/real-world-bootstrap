define(function (require) {
  var SignUpView = require('views/signup_view');
  var SignInView = require('views/signin_view');
  var Marionette = require('marionette');
  var template = require('templates/layouts/signup');
  return Marionette.Layout.extend({

    template: template,

    initialize: function (options) {

      this.on('render', function (view) {
        var signin = new SignInView({ model: options.model });
        view.signin.show(signin);
        var signup = new SignUpView({ model: options.model });
        view.signup.show(signup);
      });
    },

    regions: {
      signin: '#signin',
      signup: '#signup'
    }

  });

});
