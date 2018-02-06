var http = require('http');
var ejs = require('ejs');
// 引入数据库 MongoClient
var MongoClient = require('mongodb').MongoClient;
// // 数据库连接地址和数据库名称
var DBurl = 'mongodb://127.0.0.1:27017/itying';


var url = require('url');

var app = require('./expressRouter.js');

http.createServer(app).listen(7000);

app.get('login', (req, res) => {
	ejs.renderFile('view/form.ejs', {}, (err, data) => {
		if (err) console.log(err);

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

// 增
app.get('/add', function(req, res) {
	MongoClient.connect(DBurl, function(err, db) {
		if (err) console.log(err);
		db.collection('user').insertOne({
			'name': 'nodejs',
			'age': 10
		}, function(error, result) {
			if (error) console.log('增加数据失败');
			console.log(result)
			res.send(result.toString());
			// 关闭数据库
			db.close();
		});
	});
});

// 删
app.get('/delete', (req, res) => {
	var deleteQuery = url.parse(req.url, true).query;
	MongoClient.connect(DBurl, (err, db) => {
		if (err) console.log(err);
		console.log(deleteQuery.name)
		db.collection('user').deleteOne({
			'name': deleteQuery.name
		}, (error, result) => {
			// delete?name=xiaoming
			if (error) console.log(error);

			res.send(result.toString());
			db.close();
		});
	});
});

// 改
app.get('/edit', (req, res) => {
	MongoClient.connect(DBurl, (err, db) => {
		if (err) console.log(err);
		db.collection('user').updateOne({
			'name': 'xiaoming'
		}, {
			$set: {
				'age': 60
			}
		}, (error, result) => {
			if (error) console.log('修改数据失败');
			console.log(result)
			res.send(result.toString());
			// 关闭数据库
			db.close();
		});
	});
});

// 在MongoDB本地NodeJS驱动程序的 2.x版本中，您将获得数据库对象作为连接回调的参数：
// MongoClient.connect('mongodb://localhost:27017/mytestingdb', (err, db) => {
//   // Database returned
// });
// 根据3.0 的更新日志，你现在得到一个包含数据库对象的客户端对象：
// MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//   // Client returned
//   var db = client.db('mytestingdb');
// });
// 该close()方法也被转移到客户端。问题中的代码因此可以转换为：
// MongoClient.connect('mongodb://localhost', function (err, client) {
//   if (err) throw err;

//   var db = client.db('mytestingdb');

//   db.collection('customers').findOne({}, function (findErr, result) {
//     if (findErr) throw findErr;
//     console.log(result.name);
//     client.close();
//   });
// }); 
// 总结如下：
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'myproject';

// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });