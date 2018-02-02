var http = require('http');
var url = require('url');

var G = {};

// 
var app = function(req, res) {
	var pathname = url.parse(req.url).pathname;
	if (!pathname.endsWith('/')) {
		pathname = pathname + '/';
	}
	if (G[pathname]) {
		// 执行注册的方法
		G[pathname](req, res)
	} else {
		res.end('page 404ing');
	}
}

// 定义一个get方法
app.get = function(string, callback) {
	if (!string.endsWith('/')) {
		string = string + '/';
	}
	if (!string.startsWith('/')) {
		string = '/' + string;
	}
	// 注册方法
	G[string] = callback;

	console.log('app.get');
}

// 有请求就会触发app的方法
http.createServer(app).listen(7000);

app.get('login', (req, res) => {
	res.end('this is login');
});

app.get('register', (req, res) => {
	res.end('this is register');
});