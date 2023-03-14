// import in all needed dependencies, like inquirer, mysql, fs, path, and helped js files
const { prompt } = require('inquirer');
const db = require('./db/connection')
const cTable = require('console.table');

// SQL commands
const { selectDepts, selectRoles, selectEmployees, insertDept, insertRole, insertEmployee, updateEmployeeRole } = require('./helper/sqlCommands');
const { questions, newDeptQuestions, newRoleQuestions, newEmployeeQuestions, updateEmployeeQuestions } = require('./helper/inquirerQuestions');

// Large if else  to determine what SQL command gets run given inquirer answers
const pickSQL = function(answer) {
  // view all departments
  if (answer === "View all departments") {
    db.query(selectDepts, function (err, results) {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
        prompt(questions).then((answer) => {pickSQL(answer.selection)});
      }
    });
    // view all roles
  } else if (answer === "View all roles") {
    db.query(selectRoles, function (err, results) {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
        prompt(questions).then((answer) => {pickSQL(answer.selection)});
      }
    });
    // view all employees
  } else if (answer === "View all employees") {
    db.query(selectEmployees, function (err, results) {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
        prompt(questions).then((answer) => {pickSQL(answer.selection)});
      }
    });
    // add a dept
  } else if (answer === "Add a department") {
    prompt(newDeptQuestions)
      .then(answers => {
        const { department } = answers;

        if (department) {
          
          db.query(insertDept, department, (err, result) => {
            if (err) {
              console.error(`Here's the error: ${err}`);
            } else {
              console.log("Success!");
              prompt(questions).then((answer) => {pickSQL(answer.selection)});
            }

          })
        } else {
          console.log("uh oh spaghetti-oh at dept");
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
              prompt(questions).then((answer) => {pickSQL(answer.selection)});
            }
          })
        } else {
          console.log("uh oh spaghetti-oh at role");
        }
    })
    // add an employee
  } else if (answer === "Add an employee") {
    prompt(newEmployeeQuestions)
      .then(answers => {
        const { first_name, last_name, manager, role } = answers;

        if (first_name && last_name && manager && role) {

          db.query(insertEmployee, [first_name, last_name, manager, role], (err, result) => {
            if (err) {
              console.error(`Here's the error: ${err}`);
            } else {
              console.log("Success!");
              prompt(questions).then((answer) => {pickSQL(answer.selection)});
            }
          })
        } else {
          console.log("uh oh spaghetti-oh at employee")
        }

      })
    // update an employee role
  } else if (answer === "Update an employee role") {
    prompt(updateEmployeeQuestions)
      .then(answers => {
        const { employee, newRole } = answers;

        if (employee && newRole) {
          db.query(updateEmployeeRole, [newRole, employee], (err, result) => {
            if (err) {
              console.error(`Here's the error: ${err}`);
            } else {
              console.log("Success!");
              prompt(questions).then((answer) => {pickSQL(answer.selection)});
            }
          })
        } else {
          console.log("uh oh spaghettit-oh at employee update")
        }
      })
  }
}
// init function to control what happens on page load
const init = function () {

  // initial inquirer prompt
  prompt(questions)
    .then((answer) => {
      pickSQL(answer.selection);
    });
}

// call to init
init();


