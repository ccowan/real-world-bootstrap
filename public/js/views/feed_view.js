define(function (require) {
  var Marionette = require('marionette');
  var template = require('templates/feed');
  var EmptyView = require('views/empty_feed_view');
  var PostView = require('views/post_view');
  var _ = require('underscore');
  return Marionette.CompositeView.extend({
  
    // Set the template to our template function 
    template: template,

    // We need to tell the View to use the #posts id tag for all the post items
    itemViewContainer: '#posts',

    // Set the view for each of the items in the collection
    itemView: PostView,

    // Set the view for an empty collection
    emptyView: EmptyView,

    // When the feed view is intailzed we need to set a scroll event handler on 
    // the window so we can setup our infinite scroll feature.
    initialize: function (options) {
      this.loading = false;
      this.page = 1;
      _.bindAll(this, 'reloadOnScroll'); 
      $(window).scroll(this.reloadOnScroll);
    },

    // When the collection url is changed there needs to be a way to reset the
    // page count and the loading status.
    reset: function () {
      this.page = 1;
      this.loading = false;
    },

    // This the scroll event handler. It checks to see if the user has scrolled
    // more the 85% of the page. If they have then it checks to see if it's already
    // loading the page. If the page is more the 85% and it's not loading then
    // we fetch the next page from the server. If the server respends with less
    // then 25 items then we disable the scroll feature by NOT setting the loading
    // attribute to false.
    reloadOnScroll: function (e) {
      var self = this;
      var el = e.currentTarget;
      var scrollPercent = $(el).scrollTop() / ($(document).height() - $(el).height());

      // Make sure the user has scrolled more the 85%      
      if (scrollPercent < 0.85) return  
      // Make sure we haven't started a loading process
      if (this.loading) return; 

      // Increment the page number
      this.page++;

      // Set the loading lock, we only want to issue one of these at a time
      this.loading = true;

      // Fetch the new items
      this.collection.fetch({
        // We want the collection to append the new items not replace them
        remove: false,
        data: {
          page: this.page
        },
        success: function (collection, rawData) {
          // If we got 25 items remore the loading lock
          if (rawData.length === 25) {
            self.loading = false;
          }
        }
      });
    },

    // Because we are viewing the items in reverse order we need to prepend new
    // message to the view instead of appending. New messages will have thier
    // index set to 0
    appendHtml: function (collectionView, itemView, index) {
      if (index == 0) {
        collectionView.$(collectionView.itemViewContainer).prepend(itemView.el);
      } else {
        collectionView.$(collectionView.itemViewContainer).append(itemView.el);
      }
    }
  });
});
