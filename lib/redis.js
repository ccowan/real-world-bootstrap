// Just connect to the RedisStore and return a valid client.
var redis = require('redis');
module.exports = redis.createClient();
