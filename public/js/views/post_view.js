define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/post');
  var moment = require('moment');
  return Marionette.ItemView.extend({
    className: 'row-fluid post',
    template: template,
    serializeData: function () {
      var data = this.model.toJSON();
      data.moment = moment;
      return data;
    }
  });
});
