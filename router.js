var express	= require('express'),
app 		= express(),
config 		= require('./config/config').configure(app),
http        = require('http'),
app_routes 	= require('./backend/routes/application');

app.get('(/|/home)', app_routes.home);

app.use( app_routes.catchall);

http.createServer(app).listen(8000);

/* //Uncomment for SSL
https.createServer(app.ssl, app).listen(3001);
*/