const { prompt } = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const { start } = require('repl');

const questions = [
  {
    type: "list",
    message: "Select from options below, please!",
    choices: ["View all departments", "View all roles", "View all employees", "Add a role", "Add an employee", "Update an employee role"]
  }
];

const newRoleQuestions = [
  {
    type: "list",
    message: "What department?",
    choices: [
      { name: "eCommerce", value: 1 },
      { name: "Operations", value: 2 },
      { name: "Marketing", value: 3 },
      { name: "Sales", value: 4 }
    ],
    name: "department"
  },
  {
    type: "input",
    message: "What title? Please enter a title 10 and 100 characters long.",
    name: "title",
    validate: function (input) {
      if (input < 10 || input > 100) {
        return "Please enter a title 10 and 100 characters long.";
      } else {
        return true;
      }
    }
  },
  {
    type: "input",
    message: "What salary (no decimals allowed)?",
    name: "salary",
    validate: function (input) {
      if (input.length > 5 && input.length < 8 && /^\d+$/.test(input)) {
        return true;
      } else {
        return "Only numbers (no commas) and must between 5 and 8 digits long."
      }
    }
  },
]

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'ColinSpr0wsSux!',
    database: 'employee_db'
  }
)

const selectDepts = "SELECT * FROM departments;"
const selectRoles = `
  SELECT 
    title AS Job_Title, 
    role.id AS Role_Id, 
    name AS Department_Name, 
    salary AS Salary 
  FROM role 
  JOIN department 
  ON department.id = role.department_id;
`;

const selectEmployees = `
  SELECT 
    employee.id AS Employee_ID, 
    employee.first_name AS First_Name, 
    employee.last_name AS Last_Name, 
    title AS Job_Title, 
    name AS Department_name, 
    salary AS Salary,
    manager.first_name AS Manager_First_Name,
    manager.last_name AS Manager_Last_Name
    FROM employee
    JOIN role
    ON role.id = employee.role_id
    JOIN department
    ON department.id = role.department_id
    LEFT JOIN employee AS Manager
    ON employee.manager_id = manager.id;
`;

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
    db.query("", function (err, results) {
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