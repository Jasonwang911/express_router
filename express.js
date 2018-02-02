var http = require('http');

var app = require('./expressRouter.js');

http.createServer(app).listen(7000);

app.get('login', (req, res) => {
	console.log('loginGET');
	res.end('this is login');
})

app.get('register', (req, res) => {
	console.log('registerGET');
	res.end('this is register');
})