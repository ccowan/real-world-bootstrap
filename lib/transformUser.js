// When we send a user object to the client we want to make sure that the avatar
// URL is set and that we delete the password hash. Think of this as a filter.
var crypto = require('crypto');
module.exports = function (user) {
  if (!user.avatar) {
    var md5 = crypto.createHash('md5');
    md5.update(user.email);
    var hash = md5.digest('hex');
    user.avatar = "http://www.gravatar.com/avatar/"+hash+"?s=60&d=mm";
  }
  delete user.password;
  return user;
};
