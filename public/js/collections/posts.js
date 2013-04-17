define(function (require) {
  var Backbone = require('backbone');
  var Post = require('models/post');
  return Backbone.Collection.extend({
    model: Post,
    url: '/api/v1/posts/mine'
  });
});
