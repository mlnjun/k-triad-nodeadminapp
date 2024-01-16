var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

// express-session 패키지 참조
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin');
var articleRouter = require('./routes/article');
var channelRouter = require('./routes/channel');
const memberRouter = require('./routes/member');
const messageRouter = require('./routes/message');


var sequelize = require('./models/index.js').sequelize;

var app = express();

sequelize.sync();

// 서버세션
app.use(
  session({
    resave: false, //매번 세션 강제 저장
    saveUninitialized: true,
    secret: "testsecret",  // 암호화할때 사용하는 salt값
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge:1000 * 60 * 5 //5분동안 서버세션을 유지하겠다.(1000은 1초)
    },
  }),
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/admin', adminRouter);
app.use('/article', articleRouter);
app.use('/channel', channelRouter);
app.use('/member', memberRouter);
app.use('/message', messageRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
