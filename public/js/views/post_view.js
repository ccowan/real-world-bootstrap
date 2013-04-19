define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/post');
  var moment = require('moment');

  return Marionette.ItemView.extend({
    className: 'row-fluid post',
    template: template,

    // We need to beable to format the dates os we just attach the moment
    // library to our template so we can use it in the template.
    serializeData: function () {
      var data = this.model.toJSON();
      data.moment = moment;
      return data;
    }
  });
});
