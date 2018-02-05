var http = require('http');
var ejs = require('ejs');
// 引入数据库 MongoClient
var MongoClient = require('mongodb').MongoClient;
// // 数据库连接地址和数据库名称
var DBurl = 'mongodb://localhost:27017/itying';

var url = require('url');

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


app.get('/add', function(req, res) {
	MongoClient.connect(DBurl, function(err, db) {
		if (err) console.log(err);
		db.collection('user').insertOne({
			'name': 'nodejs',
			'age': 10
		}, function(error, result) {
			if (error) console.log('增加数据失败');

			res.send('增加数据成功');
			db.close();
		});
	});
});