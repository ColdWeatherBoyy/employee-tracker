const { prompt } = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

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
    password: 'ColinSpr0wsSux!'
  }
)

const schema = fs.readFileSync(path.join(__dirname, 'db/schema.sql'), "utf8");

db.query(`${schema}`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('Schema executed');
});

const seeds = fs.readFileSync(path.join(__dirname, 'db/seeds.sql'), "utf8");

db.query(`${seeds}`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('Seeds executed');
});

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