var http = require('http');
var ejs = require('ejs');

var app = require('./expressRouter.js');

http.createServer(app).listen(7000);

app.get('login', (req, res) => {
	ejs.renderFile('view/form.ejs', {}, (err, data) => {
		if (err) throw err;

		res.end(data)
	});
})

app.get('register', (req, res) => {
	console.log('registerGET');
	res.end('this is register');
})

// 登陆post请求
app.post('/dologin', (req, res) => {
	console.log('registerPost');
	res.end("<script>alert('登陆成功');history.back();</script>");
})