var createError = require('http-errors');
 var express = require('express');
 var path = require('path');
 var cookieParser = require('cookie-parser');
 var logger = require('morgan');
 var expressValidator = require('express-validator');
 var flash = require('express-flash');
 var session = require('express-session');
 var bodyParser = require('body-parser');

 var mysql = require('mysql');
 var connection  = require('./database');
 
 var indexRouter = require('./routes/index');
 var logoutRouter = require('./routes/logout');
 var registerRouter = require('./routes/register');
 var loginRouter = require('./routes/login');
 var cartRouter = require('./routes/cart');
 var rmcartRouter = require('./routes/rmcart');
 var addcartRouter = require('./routes/addcart');
 var sellRouter = require('./routes/sell');
 var shopRouter = require('./routes/shop');
 var scanRouter = require('./routes/scan');
 var shopfilterRouter = require('./routes/shopfilter');
 var mydogRouter = require('./routes/mydog');
 var detailRouter = require('./routes/detail');
 var checkoutRouter = require('./routes/checkout');
 var app = express();
 
// view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'views/static')));
 
 app.use(session({ 
     secret: '123456cat',
     resave: false,
     saveUninitialized: true,
     cookie: { maxAge: 1 * 60 * 60 * 1000 }
 }))
 
 app.use(flash());
 app.use(expressValidator());
 
 app.use('/', indexRouter);
 app.use('/logout',logoutRouter);
 app.use('/login',loginRouter);
 app.use('/register',registerRouter);
 app.use('/cart',cartRouter);
 app.use('/rmcart',rmcartRouter);
 app.use('/addcart',addcartRouter);
 app.use('/sell',sellRouter)
 app.use('/shop',shopRouter)
 app.use('/scan',scanRouter)
 app.use('/shopfilter',shopfilterRouter)
 app.use('/mydog',mydogRouter)
 app.use('/detail',detailRouter)
 app.use('/checkout',checkoutRouter)
 
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