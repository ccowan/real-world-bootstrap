var redis = require('../../../lib/redis');
var transform = require('../../../lib/transformUser'); 
var async = require('async');
var uuid = require('node-uuid');
var moment = require('moment');

// Set up the routes
exports.mount = function (app) {
  app.post('/api/v1/posts', exports.create);
  app.get('/api/v1/posts/:view', exports.list);
  app.get('/api/v1/posts', exports.list);
};


// This will process the mentions
var processMentions = function (post, callback) {
  var matches = post.body.match(/@([a-zA-Z0-9]+)/g);
  if (!matches) {
    return callback();
  }

  async.each(matches, function (mention, done) {
    mention = mention.replace(/@/, '');
    redis.get('user:'+mention, function (err, id) {
      if (!id) return done();
      redis.multi()
        .lpush('feed:'+id, post.id)
        .lpush('feed:'+id+':mentions', post.id)
        .exec(done);
    });
  }, callback);

};

exports.create = function (req, res, next) {
  // Check to make sure the post isn't null
  if (!req.body.post) {
    res.send({ post: "You must send a post" }, 409);
  }

  // Create the post object
  var post = {
    id: uuid.v1(),
    user: req.user.id,
    body: req.body.post,
    date: moment.utc().format()
  };

  // Insert the post and push it to the user and everyone feed
  var multi = redis.multi()
  multi.hmset('post:'+post.id, post);
  multi.lpush('feed:'+req.user.id, post.id);
  multi.lpush('feed:everyone', post.id);
  
  // Push the post to the followers feeds
  req.user.followers.forEach(function (id) {
    multi.lpush('feed:'+id, post.id);  
  });

  // Execute the Redis commands
  multi.exec(function (err, results) {
    if (err) return next(err);
    // Process the mentions
    processMentions(post, function (err) {
      if (err) return next(err);
      post.user = req.user;
      res.send(post, 201);
    });
  });

};


exports.list = function (req, res, next) {

  var page = req.query.page || 1;
  var size = req.query.limit || 25;
  var from = (page-1) * size;
  var to = from + size - 1;

  // Resolve the key for the feed
  var key = "feed:everyone";
  if (req.params.view) {
    switch (req.params.view) {
      case "mine":
        key = "feed:"+req.user.id;
        break;
      case "mentions":
        key = "feed:"+req.user.id+":mentions";
        break;
    }
  }

  // Create an array for the waterfall tasks
  var tasks = [];
  
  // Get post ids
  tasks.push(function (callback) {
    redis.lrange(key, from, to, callback);
  });

  // Map post id to feeds
  tasks.push(function (list, callback) {
    var multi = redis.multi();
    list.forEach(function (id) {
      multi.hgetall('post:'+id)
    });
    multi.exec(callback);
  });

  // Get all the users
  tasks.push(function (feed, callback) {
    var multi = redis.multi();
    feed.forEach(function (post) {
      multi.hgetall('users:'+post.user) 
    });
    multi.exec(function (err, users) {
      if (err) return callabck(err);
      feed.forEach(function (post, index) {
        post.user = transform(users[index]);
      });
      callback(null, feed);
    });
  });

  // Run all the tasks in waterfall mode
  async.waterfall(tasks, function (err, feed) {
    if (err) return next(err);
    res.send(feed, 200);
  });
};
