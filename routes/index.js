var routes = {};

routes.getIndex = function(req, res) {
  res.render('index', { title: 'Nick Alto' });
};

module.exports = routes;
