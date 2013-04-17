define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/feed');
  var PostView = require('views/post_view');
  return Marionette.CompositeView.extend({
    template: template,
    itemViewContainer: '#posts',
    itemView: PostView,
    appendHtml: function (collectionView, itemView, index) {
      if (index == 0) {
        collectionView.$(collectionView.itemViewContainer).prepend(itemView.el);
      } else {
        collectionView.$(collectionView.itemViewContainer).append(itemView.el);
      }
    }
  });
});
