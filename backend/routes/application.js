 exports.home = function(req, res) {
	res.render('home', {
    title: 'Home',
    nav_class: 'navbar-home',
  });
};

exports.catchall = function(req, res) {
	res.render('404', {
    	title: '404',
	    hide_navbar:true
  	});
};
