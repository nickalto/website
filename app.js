var app = require('express')();
var config = require('./config/setup');
var router = require('./routes/router');

config.initialize(app);
router.initialize(app);

module.exports = app;
