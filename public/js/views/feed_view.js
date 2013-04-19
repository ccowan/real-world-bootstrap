define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/feed');
  var EmptyView = require('views/empty_feed_view');
  var PostView = require('views/post_view');
  var _ = require('underscore');
  return Marionette.CompositeView.extend({
    template: template,
    itemViewContainer: '#posts',
    itemView: PostView,
    emptyView: EmptyView,
    initialize: function (options) {
      this.realoding = false;
      this.page = 1;
      _.bindAll(this, 'reloadOnScroll'); 
      $(window).scroll(this.reloadOnScroll);
    },
    reloadOnScroll: function (e) {
      var self = this;
      var el = e.currentTarget;
      var scrollPercent = $(el).scrollTop() / ($(document).height() - $(el).height());

      
      if (scrollPercent < 0.85) return  
      if (this.reloading) return; 

      this.page++;
      this.reloading = true;

      this.collection.fetch({
        remove: false,
        data: {
          page: this.page
        },
        success: function (collection, rawData) {
          if (rawData.length === 25) {
            self.reloading = false;
          }
        }
      });
    },
    appendHtml: function (collectionView, itemView, index) {
      if (index == 0) {
        collectionView.$(collectionView.itemViewContainer).prepend(itemView.el);
      } else {
        collectionView.$(collectionView.itemViewContainer).append(itemView.el);
      }
    }
  });
});
