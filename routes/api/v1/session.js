var passport = require('../../../lib/passport');
exports.mount = function (app) {
  app.post('/api/v1/session', passport.authenticate('local'), exports.login);
  app.get('/api/v1/session', exports.index);
  app.get('/api/v1/session/:id', exports.index);
}

exports.index = function (req, res, next) {
  if (!req.user) return res.send({ error: "You shall not pass" }, 403);
  res.send(req.user, 200);
}

exports.login = function (req, res, next) {
  res.send(req.user, 200);
}
