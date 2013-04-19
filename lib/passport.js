var passport = module.exports = require('passport');
var transform = require('./transformUser'); 
var LocalStrategy = require('passport-local').Strategy;
var redis = require('./redis');
var bcrypt = require('bcrypt');

// This is where we setup the local strategy to setup the user. This is pretty
// simple. Find the user record, chceck theier password then either return the 
// user record or false depending on if the user was succesfully authenticated.
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

// Here we just return the user's id for the session store
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Here we return the user for the current session.
passport.deserializeUser(function (id, done) {
  redis.multi()
    .hgetall('users:'+id)
    .smembers('followers:'+id)
    .smembers('following:'+id)
    .exec(function (err, results) {
      var user = transform(results[0]);
      user.followers= results[1];
      user.following= results[2];
      done(null, user);
    });
});
