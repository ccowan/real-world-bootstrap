define(function (require) {
  var SignUpView = require('views/signup_view');
  var SignInView = require('views/signin_view');
  var Marionette = require('marionette');
  var template = require('templates/layouts/signup');
  return Marionette.Layout.extend({

    // Since we are using a template that can take just the data as an argument
    // we just need to set the template attribute to our actual template function
    template: template,

    // Upon initialization we need to attach a handler to the layout's "render"
    // event that will initlaize the sub views and attach then to the layout's
    // regions. This will create a cascading effect when the layout is attached
    // to the stage.
    initialize: function (options) {

      // Attach a handler for the render event
      this.on('render', function (view) {

        // Initalize the SignInView and attach it to the signin region
        var signin = new SignInView({ model: options.model });
        view.signin.show(signin);

        // Initalize the SignUpView and attach it to the region
        var signup = new SignUpView({ model: options.model });
        view.signup.show(signup);
      });
    },

    // Define the regions for the layout
    regions: {
      signin: '#signin',
      signup: '#signup'
    }

  });

});
