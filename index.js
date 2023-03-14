const { prompt } = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const { selectDepts, selectRoles, selectEmployees} = require('./helper/sqlCommands');
const { selectDepts, selectRoles, selectEmployees} = require('./helper/inquirerQuestions');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'ColinSpr0wsSux!',
    database: 'employee_db'
  }
)

const seeds = fs.readFileSync(path.join(__dirname, 'db/seeds.sql'), "utf8");

const pickSQL = function(answer) {
  if (answer === "View all departments") {
    db.query(selectDepts, function (err, results) {
      console.table(results);
    });
  } else if (answer === "View all roles") {
    db.query(selectRoles, function (err, results) {
      console.table(results);
    });
  } else if (answer === "View all employees") {
    db.query(selectEmployees, function (err, results) {
      console.table(results);
    });
  } else if (answer === "Add a role") {
    prompt(newRoleQuestions)
      .then(answers => {
        const { department, title, salary } = answers;

        if (department && title && salary) {
          
          db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [title, salary, department], (err, result) => {
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
  } else if (answer === "Add an employee") {

  } else if (answer === "Update an employee role") {

  }
}

const init = function () {

  db.query(seeds, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Script executed');
  });

  prompt(questions)
    .then((answer) => pickSQL(answer[0]));
}

init();