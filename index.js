const { prompt } = require('inquirer');
const mysql = require('mysql2');

const questions = [
  {
    type: "list",
    message: "Select from options below, please!",
    choices: ["View all departments", "View all roles", "View all employees", "Add a role", "Add an employee", "Update an employee role"]
  }
];

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'ColinSpr0wsSux!',
    database: ''
  }
)

const pickSQL= function(answer) {
  if (answer === "View all departments") {
    db.query("SELECT * FROM departments", function (err, results) {
      console.log(results);
    });
  } else if (answer === "View all roles") {
    db.query("SELECT * FROM roles", function (err, results) {
      console.log(results);
    });
  } else if (answer === "View all employees") {
    db.query("SELECT * FROM employees", function (err, results) {
      console.log(results);
    });
  } else if (answer === "Add a role") {
    
  } else if (answer === "Add an employee") {

  } else if (answer === "Update an employee role") {

  }
}

const init = function () {
  prompt(questions)
    .then((answer) =>RUN SQL COMMANDS)
}