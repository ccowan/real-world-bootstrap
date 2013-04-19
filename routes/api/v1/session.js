var async = require('async');
var transform = require('../../../lib/transformUser'); 
var redis = require('../../../lib/redis');
var schemajs = require('schemajs');
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var passport = require('../../../lib/passport');
var crypto = require('crypto');
var moment = require('moment');

var model = schemajs.create({
  username: { type: 'alphanum', filters: ['trim'], required: true, error: "Username should only contain leters and numbers" },
  email: { type: 'email', filters: ['trim'], required: true, error: "Email is not valid" },
  name: { type: 'string', filters: ['trim'], required: true, error: "Name is required" },
  password: { type: 'string', filters: ['trim'], required: true, error: "Password is required" }
});

exports.mount = function (app) {
  app.post('/api/v1/session', exports.signup);
  app.put('/api/v1/session/:id', passport.authenticate('local'), exports.login);
  app.get('/api/v1/session', exports.index);
  app.get('/api/v1/session/:id', exports.index);
  app['delete']('/api/v1/session/:id', exports.logout);
}

exports.index = function (req, res, next) {
  if (!req.user) return res.send({ error: "You shall not pass" }, 403);
  res.send(transform(req.user), 200);
}

exports.login = function (req, res, next) {
  res.send(transform(req.user), 200);
}

exports.logout = function (req, res, next) {
  req.logout();
  res.send({}, 204);
};

exports.signup = function (req, res, next) {
  var tasks = [];
  var user = model.validate(req.body);
  var id = uuid.v1();

  if (!user.valid) {
    return res.send(user.errors, 409);
  };

  user.data.id = id;
  user.data.createdOn = moment.utc().format();

  // Check for existing users
  tasks.push(function (done) {
    redis.get('user:'+user.data.username, function (err, id) {
      if (err) return done(err);
      if (id) return done({ username: 'Username already exists' }); 
      done(null, true);
    });
  });

  // Check the email is unique
  tasks.push(function (done) {
    redis.sismember('registered-emails', user.data.email, function (err, resp) {
      if (err) return done(err);
      if (resp === 1) return done({ email: 'Email already registered' });
      done();
    });
  });

  // Register user
  tasks.push(function (done) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.data.password, salt, function (err, hash) {
        user.data.password = hash;
        redis.multi()
          .hmset('users:'+user.data.id, user.data)
          .sadd('registered-emails', user.data.email)
          .set('user:'+user.data.username, user.data.id)
          .exec(done);
      });
    });
  });

  async.series(tasks, function (err, results) {
    if (err) {
      return res.send(err, 400);
    }
    req.login(user.data, function (err) {
      if (err) return next(err);
      res.send(transform(user.data), 201);
    });
  });
};


