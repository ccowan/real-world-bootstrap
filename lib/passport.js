var passport = module.exports = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var redis = require('./redis');
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy(function (username, password, done) {
  redis.get('user:'+username, function (err, id) {
    if (!id) return done(null, false);
    if (err) return done(err);
    redis.hgetall('users:'+id, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Can't find user" });
      bcrypt.compare(password, user.password, function (err, res) {
        if (err) return done(err);
        if (!res) return done(null, false, { message: "Wrong password" });
        done(null, user);
      });
    });
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  redis.hgetall('users:'+id, function (err, user) {
    done(null, user);
  });
});
