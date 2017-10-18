var express = require('express');
var path = require('path');
var mailConfig = require('./mailConfig');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var socialPassport = require('./controllers/socialPassportController');
var apiKeys = require('./apiKeys');
var session = require('express-session');
var io = require('socket.io');

var app = express();
// var for routes
var index = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');
var messages = require('./routes/messages');
var follows = require('./routes/follows');
var favs = require('./routes/favs');
var files = require('./routes/files');

// para devolver estado por consola.
app.use(morgan('combined'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var Account = require('./models/accounts');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//social Login facebook
passport.use(new FacebookStrategy({
  clientID: apiKeys.facebook.appID,
  clientSecret: apiKeys.facebook.appSecret,
  callbackURL: apiKeys.facebook.callbackUrl,
  'profileFields': ['id', 'displayName', 'email', 'name'],
}, socialPassport.facebook ));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(multer({dest : "./userFiles/projectImage"}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: 's1crette',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge : 3600000 } //1 Hour
}));

app.use(passport.initialize());
app.use(passport.session());
//Rutas express
app.use('/', index);
app.use('/user', users);
app.use('/project', projects);
app.use('/message', messages);
app.use('/follow', follows);
app.use('/fav', favs);
app.use('/file', files);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

mongoose.connect('mongodb://localhost/archiers');
module.exports = app;
