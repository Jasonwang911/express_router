var url = require('url');
var fs = require('fs');

// 封装 res.send()的方法
function changeRes(res) {
	res.send = function(data) {
		res.writeHead(200, {
			'Content-Type': 'text-html; charset=utf-8'
		});
		res.end(data);
	}
}

// 使用module.exports 暴露方法
// 需要暴漏的方法
var Server = function() {

	var G = this; // 全局变量
	G._get = []; // get路由的数组
	G._post = []; // post路由的数组

	var app = function(req, res) {
		// 挂载 res.end(); 的方法
		changeRes(res)
		// 获取路由
		var pathname = url.parse(req.url).pathname;
		// 获取请求方式
		var method = req.method.toLowerCase();

		if (!pathname.endsWith('/')) {
			pathname = pathname + '/';
		}
		if (G['_' + method][pathname]) {
			// 执行对应的方法
			if (method == 'post') {
				// 获取请求数据
				var postData = '';
				req.on('data', (chunk) => {
					postData += chunk;
				});
				req.on('end', (err, chunk) => {
					if (err) throw err;
					console.log(postData);
					fs.appendFile('postData.txt', postData + '\n', (error) => {
						if (error) throw error;
						console.log('写入postData数据成功');
					});
					req.body = postData;
					G['_' + method][pathname](req, res);
				});

			} else {
				G['_' + method][pathname](req, res);
			}
		} else {
			res.end('page 404ing');
		}
	}

	app.get = function(string, callback) {
		if (!string.endsWith('/')) {
			string = string + '/';
		}
		if (!string.startsWith('/')) {
			string = '/' + string;
		}
		// 注册方法
		G._get[string] = callback;
	}

	app.post = function(string, callback) {
		if (!string.endsWith('/')) {
			string = string + '/';
		}
		if (!string.startsWith('/')) {
			string = '/' + string;
		}
		// 注册方法
		G._post[string] = callback;
	}

	return app;
}

module.exports = Server();