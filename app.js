/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var RedisStore = require('connect-redis')(express);
var passport = require('./lib/passport');
var app = express();

// all environments
//  Most of this stuff is basic boiler plate from a standard Express App. The
//  only real differences is that we want to store all the session details in
//  Redis so the sessions can be shared across multiple frontends
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('3qu3nv,boiru83qo4ihu@p4k30!~dfai'));
app.use(express.session({
  store: new RedisStore(),
  password: 'qjj28dfsnnaasidfiasdfn3n3!@#9aasdnf'
}));

// Use passwort to manage the authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Instead of declaring our routes the traditional way and creating a huge file
// I like to push that code to the actual routes file.
require('./routes/api/v1/session').mount(app);
require('./routes/api/v1/posts').mount(app);

// Since theis is a single page app I'm goign to catch anything that wasn't
// handled by the api routes and just serve the base page.
app.get('*', routes.index);

// Start up the server and listen for requests.
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
