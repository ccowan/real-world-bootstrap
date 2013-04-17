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
