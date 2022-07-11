require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
var Validator = require('./helpers/validator');
var ProductError = require('./error-class/ProductError');

class FormValidationError extends Error {
  constructor(errors, message="Invalid input"){
    super(message);
    this.errors = errors;
  }
}

var expressJson = Object.create(express().response, {
    data: {
      value: function(data, message){
        return this.status(200).json({
          data: data || null,
          message: message || '',
          status: 'success',
        });
      }
    },
    fail: {
      value: function(error, message, error_code=400){
        return this.status(error_code).json({
          data: error || null,
          message: message || '',
          status: 'fail',
        });
      }
    },
    error: {
      value: function(error, message, error_code=400){
        return this.status(error_code).json({
          data: error || null,
          message: message || '',
          status: 'error',
        });
      }
    },
});

var expressRequest = Object.create(express().request, {
  validate: {
    value: function(data, rules){
      return new Promise(function(resolve, reject){
        const v = new Validator(data, rules);
        v.checkAsync(function(){
          // pass
          resolve(true);
        }, function(){
          // fail
          reject(new FormValidationError(v.errors, "Invalid Input"));
        });
      });
    }
  }
});

var app = express();
app.response = expressJson;
app.request = expressRequest;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next){
  console.error(err);
  if(err instanceof FormValidationError){
    // form vlaidation error
    res.error(err.errors, err.message);

  }else if(err instanceof ProductError){
    // product error
    res.error('', err.message);
  }else{
    next(err);
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.send("Not Found");
});

module.exports = app;
