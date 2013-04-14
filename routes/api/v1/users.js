var async = require('async');
var redis = require('redis');
var schemajs = require('schemajs');

var model = schemajs.create({
  username: { type: 'alphanum', filters: ['trim'], required: true },
  email: { type: 'email', filters: ['trim'], required: true },
  name: { type: 'string', filters: ['trim'], required: true },
  password: { type: 'string', filters: ['trim'], required: true }
});


exports.mount = function (app) {
  app.put('/api/v2/users', exports.create);
};

exports.create = function (req, res, next) {
  var tasks = [];
  var user = model.validate(req.body);

  if (!user.valid) {
    return res.send(user.errors, 409);
  };

  // Check for existing users
  tasks.push(function (done) {
    redis.hgetall('users:'+user.data.username, function (err, user) {
      if (err) return done(err);
      if (user) return done(new Error('User already exists')); 
      done(null, true);
    });
  });

  // Register user
  tasks.push(function (done) {
    redis.hmset('users:'+user.data.username, user.data, done);
  });

  async.series(tasks, function (err, results) {
    if (err) return next(err);
    req.login(user.data, function (err) {
      if (err) return next(err);
      res.send(user.data, 201);
    });
  });
};

