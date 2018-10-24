var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var velocity = require('velocityjs')
var fs = require('fs');
var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var layout = require('./routes/layout');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vm');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/undefined', express.static(path.join(__dirname, 'views/webapp/')));

app.use('/', routes);
app.use('/users', users);
app.use('/home', home);
app.use('/layout', layout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//全用vm模板引擎
app.engine('vm',function(path,options,fn){
    console.log('path: ' + path);
    var template = fs.readFileSync(path).toString();
    var macros = {
        parse: function(file) {
            console.log("当前文件" + file)
            var lu = __dirname + '/views/webapp/WEB-INF/velocity/';
            var template = fs.readFileSync(lu + file).toString();
            console.log("当前路径" + lu + file)
            return this.eval(template);
        }
    }
    try{
        fn(null, velocity.render(template, options, macros))
    }catch(err){
        console.log(err);
        fn(err)
    }
});//end engine




module.exports = app;
