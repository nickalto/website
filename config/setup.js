var express = require('express');
var path = require('path');
var serve_favicon = require('serve-favicon');
var morgan_logger = require('morgan');
var cookie_parser = require('cookie-parser');
var body_parser = require('body-parser');


// Initialize view engine for express app
var viewEngine = function(app) {
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'jade');
};

// Initialize app local variables for express app
var localVariables = function(app) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
};

// Initialize parser, and cookie parser for express app
var parser = function(app) {
  app.use(body_parser.json());
  app.use(body_parser.urlencoded({
    extended: true
  }));
  app.use(cookie_parser());
};

// Initialize logger for express app
var logger = function(app) {
  /* For performance disable logging on production
   * Long term this should be configured for smaller
   * more efficient logs on production.
   */
  if(app.locals.ENV == 'development') {
    app.use(morgan_logger('dev'));
  }
};

// Initialize static assets for express app
var staticAssets = function(app) {
  var hours = 3;
  var cache_control_timeout = ( 3600 * hours );
  app.use(express.static(path.join(__dirname, '../public'), { maxAge: cache_control_timeout }));
};

// Initialize favicon for express app
var favicon = function(app) {
  // app.use(serve_favicon(__dirname + '/public/img/favicon.ico'));
};

module.exports = {
  initialize: function(app) {
    viewEngine(app);
    localVariables(app);
    logger(app);
    parser(app);
    staticAssets(app);
    favicon(app);
  }
};
