var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const whiteList = ["http://localhost:3000"]

const corsOptions = {
  origin: function (origin, callback) {
    let pCors = {
      origin: false
    };
    if (origin) {
      let permitted = whiteList.find(o => origin.startsWith(o));
      if (permitted) {
        pCors.origin = true;
      }
    }
    callback(null, pCors);
  },
  optionsSuccessStatus: 200
}

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catequizandosRouter = require('./routes/catequizandos');
const catequistasRouter = require('./routes/catequistas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/v1/catequizandos', catequizandosRouter);
app.use('/api/v1/catequistas', catequistasRouter);

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
