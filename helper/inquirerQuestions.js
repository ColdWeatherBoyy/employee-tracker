const { selectDepts } = require("./sqlCommands");

// Question for initial inquirer prompt
const questions = [
  {
    type: "list",
    message: "Select from options below, please!",
    choices: ["View all departments", "View all roles", "View all employees", "Add a role", "Add an employee", "Update an employee role"]
  }
];

// inquirer set of questions for adding a new dept
const newDeptQuestions = [
  {
    type: "input",
    message: "What's the new department? Must be between 5-100 characters.",
    name: "department",
    validate: function(input) {
      if (input < 5 || input > 100) {
        return "Please enter a department between 5 and 100 characters long.";
      } else {
        return true;
      }}
  }
]

// inquirer set of questions for adding a new role
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
        return "Please enter a title between 0 and 100 characters long.";
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
];

// inquirer set of questions for adding a new employee
const newEmployeeQuestions = [
  {
    type: "list",
    message: "What department?",
    choices: 
      db.query(selectDepts, (err, results) => {
        if (err) {
          console.error(`Here's the error: ${err}`);
        } else {
          departmentChoices = results.map(department => ({ name: department.name, value: department.id }));
        }
      }),
    name: "department"
  },
  {
    type: "input",
    message: "What title? Please enter a title 10 and 100 characters long.",
    name: "title",
    validate: function (input) {
      if (input < 10 || input > 100) {
        return "Please enter a title between 0 and 100 characters long.";
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
];




// exports
module.exports = { questions, newDeptQuestions, newRoleQuestions, newEmployeeQuestions };