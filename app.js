var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 휘발성 데이터를 특정 페이지에 전달하는 패키지
var flash = require('connect-flash');

require('dotenv').config();

var expressLayouts = require('express-ejs-layouts');

// express-session 패키지 참조
const redis = require("redis");
var session = require('express-session');
let RedisStore = require("connect-redis")(session);

// Redis 클라이언트 정보 추후 .env 설정 
let redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  db: 0,
  password: "test12345",
});

// passport
const passport = require('passport');
const passportConfig = require('./passport/index.js');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin');
var articleRouter = require('./routes/article');
var channelRouter = require('./routes/channel');
const memberRouter = require('./routes/member');
const messageRouter = require('./routes/message');


var sequelize = require('./models/index.js').sequelize;

var app = express();

app.use(flash());

sequelize.sync();

passportConfig(passport);


// 분산 서버세션
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: true,
    secret: process.env.REDIS_SECRET,
    resave: false,
    cookie: {
    httpOnly: true,
    secure: false,
  },
  ttl : 60 * 60 * 24, //Redis DB에서 세션정보가 사라지게 할지에 대한 만료시간설정
  token: process.env.REDIS_TOKEN_KEY,
  })
);

// 서버세션
// app.use(
//   session({
//     resave: false, //매번 세션 강제 저장
//     saveUninitialized: true,
//     secret: "testsecret",  // 암호화할때 사용하는 salt값
//     cookie: {
//       httpOnly: true,
//       secure: false,
//       maxAge:1000 * 60 * 1440 //24시간동안 서버세션을 유지(1000은 1초)
//     },
//   }),
// );

//패스포트-세션 초기화 : express session 뒤에 설정
app.use(passport.initialize());
app.use(passport.session());



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
