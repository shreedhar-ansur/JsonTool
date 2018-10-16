var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./routes/config');
var login = require('./routes/login');
var homePage = require('./routes/homePage.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',ejs.renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

app.use(logger('combined', {stream: accessLogStream}));

app.use(function(req, res, next) {
    console.log("called");
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/homePage', homePage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    console.log(err.message);
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;
var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});