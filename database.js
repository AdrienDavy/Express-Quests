require("dotenv").config();
//mysql2 permet de communiquer avec mysql
const mysql = require("mysql2/promise");
//OU
// const mysqlConnection = require('mysql2');
// const mysql = mysqlConnection.promise();

const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


module.exports = database;