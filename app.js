var http = require('http');
var url = require('url');
var ejs = require('ejs');

http.createServer((req, res) => {
	if (pathname == '/favicon.ico') return false;

	res.writeHead(200, {
		"Content-Type": "text/html;charset='utf-8'"
	});

	var pathname = url.parse(req.url).pathname;

	console.log(ejs)
	if (pathname == '/login') {
		var loginData = '我是登陆页面的数据';
		ejs.renderFile('./view/login.ejs', {
			json: {
				arr: [{
					user: 'jason',
					pass: '123456'
				}, {
					user: 'xiaoming',
					pass: '654321'
				}, {
					user: 'xiaokui',
					pass: '121212'
				}]
			}
		}, (error, data) => {
			if (error) throw error;
			res.end(data)
		});

	} else if (pathname == '/register') {
		var msg = '我是注册页面的数据';
		ejs.renderFile('./view/register.ejs', {
			msg: msg
		}, (error, data) => {
			if (error) throw error;
			res.end(data);
		});
	} else if (pathname == '/admin') {
		var msg = '我是登陆页面的数据';
		ejs.renderFile('./view/admin.ejs', {
			msg: msg
		}, (error, data) => {
			if (error) throw error;
			res.end(data);
		});
	} else {
		var msg = '我是首页的数据';
		ejs.renderFile('./view/index.ejs', {
			msg: msg
		}, (error, data) => {
			if (error) throw error;
			res.end(data);
		});
	}

}).listen(7000);