var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./app/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// 设置session中间件
app.use(session({ secret: 'wilson', cookie: { maxAge: 60 * 60 * 1000 }, resave: false, saveUninitialized: true}));

// 启动mongo数据库
global.mongoClient = require('./app/dao/mongo/models');

app.use('/', indexRouter);
let adminRouter = require('./app/routes/admin');
let utilRouter = require('./app/routes/util');
let fileUpload = require('./app/routes/uploadFile');
app.use('/admin', adminRouter);
app.use('/util', utilRouter);
app.use('/file', fileUpload);

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
