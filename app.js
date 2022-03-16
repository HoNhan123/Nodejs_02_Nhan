var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');



//path
const pathApp = require('./path');

global.__base = __dirname + '/';
global.__p_configs = __base + pathApp.f_configs + '/';
global.__p_public = __base + pathApp.f_public + '/';
global.__p_routes = __base + pathApp.f_routes + '/';
global.__p_schemas = __base + pathApp.f_schemas + '/';
global.__p_views = __base + pathApp.f_views + '/';
global.__pv_elements = __p_views + pathApp.fv_elements + '/';
global.__pv_pages = __p_views + pathApp.fv_pages + '/';
global.__pc_system = __p_configs + 'system';
global.__pr_admin = __p_routes + 'admin' + '/';
global.__pr_users = __p_routes + 'users' + '/';
global.__pAdmin = require(`${__pc_system}`).prefixAdmin;


//mongoose
mongoose.connect(`mongodb+srv://HoNhan123:HoNhan123@cluster0.wz6eb.mongodb.net/Traning_Nodejs`);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(require('express-ejs-layouts'));
app.set('layout',__p_views + 'root');

//static folder
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Local variable
app.locals.systemConfig = __pc_system;


//set routes
app.use('/' + `${__pAdmin}`, require(`${__pr_admin}index`));
app.use('/',require(`${__pr_users}index`));

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
