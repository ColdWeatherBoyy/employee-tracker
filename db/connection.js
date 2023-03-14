const mysql = require('mysql2');

// create connection with mysql server
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'ColinSpr0wsSux!',
    database: 'employee_db'
  }
)

module.exports = db;