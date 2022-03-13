var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Path appjs
global.__appjs = __dirname + '/';
// Path folders
const pathF = require('./paths');
const { prefixBackend } = require('./paths');
global.__myApp = __appjs + pathF.f_myApp +'/' ;
global.__configs = __myApp + pathF.f1_configs +'/';
global.__routes = __myApp + pathF.f1_routes +'/';
global.__rbackend = __routes + pathF.f2_backend +'/';
global.__rfrontend = __routes + pathF.f2_frontend +'/';
global.__views = __myApp + pathF.f1_views +'/';
global.__vbackend = __views + pathF.f2_backend +'/';
global.__vfrontend = __views + pathF.f2_backend +'/';
global.__public = __appjs + pathF.f_public +'/';
global.__pbackend = pathF.prefixBackend +'/';
global.__pfrontend = pathF.prefixFrontend +'/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout',`${__vbackend}` + 'backend');

// Set routes
app.use(`/${__pbackend}`, require(`${__rbackend}index`));
//app.use(`/${__pfrontend}`, require(`${__rfrontend}index`))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
