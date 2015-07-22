var routes = {
  index: require('./index'),
  error: require('./error'),
}

var initialize = function(app) {
  app.get('/', routes.index.getIndex);

  routes.error.initialize(app);
};

module.exports = {
  initialize: initialize
};
