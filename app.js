var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var paginate = require('express-paginate');
var i18n = require('i18n');

var hbs=require('hbs');
var hbsUtils = require('hbs-utils')(hbs);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registroRouter = require('./routes/registro');
var loginFlash = require('./routes/login-flash');
var regenerationRouter = require('./routes/regeneration');
var activateRouter = require('./routes/activate');
var cambioRouter = require('./routes/cambio');
var closeSessionRouter = require('./routes/closeSession');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');
var i18n_routes = require('./routes/i18n-routes');



var ExpressSession = require('express-session');

const Logger = require('./configuration/Winston');
const winston = require('winston');
const hbsemail = require('nodemailer-express-handlebars');


var app = express();
i18n.configure({
  locales:['es', 'en'],
  cookie:'secret-lang',
  directory:__dirname+'/locales',
  defaultLocales:'en'
})
app.use(paginate.middleware(2,20));

//view engine partials
hbsUtils.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/locale/:lang', (req, res, next)=>{
  res.cookie('secret-lang', req.params.lang);
  i18n.setLocale(req.params.lang)
  res.redirect('/i18n-routes');
});

app.use(i18n.init);

require('./helpers/hbs')(hbs);

app.use(ExpressSession({
  secret:'GeekshubsAcademy',
  name:'SesionGeek',
  resave:true,
  saveUninitialized:true
}));

app.use(flash());

app.use(logger('dev'));
//app.use(logger('combined', {stream: winston.stream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('components',express.static(path.join(`${__dirname}/public/components`)));
/*
let env = process.env.NODE_ENV;
switch(env){
  case 'development':
    console.log('Has entrado en modo desarollo');
    break;
  case 'production':
    console.log('Has entrado en modo produccion');
    break;
  default:
  console.log('No has introducido un entorno de ejecucion');
  process.exit(1);
}*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/login-flash', loginFlash);
app.use('/registro', registroRouter);
app.use('/regeneration', regenerationRouter);
app.use('/activate', activateRouter);
app.use('/cambio', cambioRouter);
app.use('/closeSession', closeSessionRouter)
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/i18n-routes', i18n_routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
 // next(createError(404));
  res.render('notfound');
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
