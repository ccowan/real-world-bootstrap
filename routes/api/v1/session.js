var async = require('async');
var redis = require('../../../lib/redis');
var schemajs = require('schemajs');
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var passport = require('../../../lib/passport');

var model = schemajs.create({
  username: { type: 'alphanum', filters: ['trim'], required: true },
  email: { type: 'email', filters: ['trim'], required: true },
  name: { type: 'string', filters: ['trim'], required: true },
  password: { type: 'string', filters: ['trim'], required: true }
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
  res.send(req.user, 200);
}

exports.login = function (req, res, next) {
  res.send(req.user, 200);
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

  // Check for existing users
  tasks.push(function (done) {
    redis.get('user:'+user.data.username, function (err, id) {
      if (err) return done(err);
      if (id) return done(new Error('User already exists')); 
      done(null, true);
    });
  });

  // Check the email is unique
  tasks.push(function (done) {
    redis.sismember('registered-emails', user.data.email, function (err, resp) {
      if (err) return done(err);
      if (resp === 1) return done(new Error('Email already registered'));
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
    if (err) return next(err);
    req.login(user.data, function (err) {
      if (err) return next(err);
      res.send(user.data, 201);
    });
  });
};


