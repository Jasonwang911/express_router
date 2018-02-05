var mysql = require('mysql')

const db = mysql.createPool({
	host: '47.95.223.216',
	port: '3306',
	user: 'jason',
	password: 'shen396689144',
	database: 'learn'
});


db.query(`SELECT * FROM orders`, (err, data) => {
	console.log(err)
	console.log(data)
})