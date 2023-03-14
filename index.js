// import in all needed dependencies, like inquirer, mysql, fs, path, and helped js files
const { prompt } = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
// SQL commands
const { selectDepts, selectRoles, selectEmployees, insertDept, insertRole } = require('./helper/sqlCommands');
const { questions, newDeptQuestions, newRoleQuestions, newEmployeeQuestions } = require('./helper/inquirerQuestions');

// create connection with mysql server
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'ColinSpr0wsSux!',
    database: 'employee_db'
  }
)

// function to allow dynamic reading of seeds file after database connection is made
const seeds = fs.readFileSync(path.join(__dirname, 'db/seeds.sql'), "utf8");

// Large if else  to determine what SQL command gets run given inquirer answers
const pickSQL = function(answer) {
  // view all departments
  if (answer === "View all departments") {
    db.query(selectDepts, function (err, results) {
      console.table(results);
    });
    // view all roles
  } else if (answer === "View all roles") {
    db.query(selectRoles, function (err, results) {
      console.table(results);
    });
    // view all employees
  } else if (answer === "View all employees") {
    db.query(selectEmployees, function (err, results) {
      console.table(results);
    });
    // add a dept
  } else if (answer === "Add a dept") {
    prompt(newDeptQuestions)
      .then(answers => {
        const { department } = answers;

        if (department) {
          
          db.query(insertDept, department, (err, result) => {
            if (err) {
              console.error(`Here's the error: ${err}`);
            } else {
              console.log("Success!");
            }

          })
        } else {
          console.log("uh oh spaghetti-oh");
        }
    })
  } else if (answer === "Add a role") {
    prompt(newRoleQuestions)
      .then(answers => {
        const { department, title, salary } = answers;

        if (department && title && salary) {
          
          db.query(insertRole, [title, salary, department], (err, result) => {
            if (err) {
              console.error(`Here's the error: ${err}`);
            } else {
              console.log("Success!");
            }

          })
        } else {
          console.log("uh oh spaghetti-oh");
        }
    })
    // add an employee
  } else if (answer === "Add an employee") {
    prompt(newEmployeeQuestions)
      .then(answers => )
    // update an employee role
  } else if (answer === "Update an employee role") {

  }
}
// init function to control what happens on page load
const init = function () {

  // query statement to run seeds SQL command
  db.query(seeds, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Script executed');
  });

  // initial inquirer prompt
  prompt(questions)
    .then((answer) => pickSQL(answer[0]));
}

// call to init
init();