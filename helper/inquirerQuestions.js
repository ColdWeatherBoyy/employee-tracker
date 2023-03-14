// Question for initial inquirer prompt
const questions = [
  {
    type: "list",
    message: "Select from options below, please!",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
    name: "selection"
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
    message: "What salary (no decimals allowed and don't add a comma please)?",
    name: "salary",
    validate: function (input) {
      if (input.length >= 5 && input.length <= 8 && /^\d+$/.test(input)) {
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
    type: "input",
    message: "Please enter a first name betwen 0 and 30 characters.",
    name: "first_name",
    validate: function (input) {
      if (input < 0 || input > 30) {
        return "Must be between 0 and 30 characters long.";
      } else {
        return true;
      }
    }
  },
  {
    type: "input",
    message: "Please enter a last name betwen 0 and 30 characters.",
    name: "last_name",
    validate: function (input) {
      if (input < 0 || input > 30) {
        return "Must be between 0 and 30 characters long.";
      } else {
        return true;
      }
    }
  },
  {
    type: "list",
    message: "Please select an available manager.",
    name: "manager",
    choices: [
      { name: "Julia Gribbins", value: 1 },
      { name: "Michael Statler", value: 3 },
      { name: "Luther Punchins", value: 5 },
      { name: "Happy Bappletine", value: 7 }
    ],
  },
  {
    type: "list",
    message: "Please select new role.",
    name: "role",
    choices: [
      { name: "eCommerce Coordinator", value: 1 },
      { name: "Operations Coordinator", value: 3 },
      { name: "Marketing Coordinator", value: 5 },
      { name: "Sales Coordinator", value: 7 }
    ],
  },
];
const updateEmployeeQuestions = [
  {
    type: "list",
    message: "Please select an employee to update role.",
    name: "employee",
    choices: [
      { name: "Jimmy Besancon", value: 2},
      { name: "Roger Lundler", value: 4},
      { name: "Mikayla Prindle", value: 6},
      { name: "Carter Lundquist", value: 8}
    ]
  },
  {
    type: "list",
    message: "What is their new role?.",
    name: "newRole",
    choices: [
      { name: "eCommerce Manager", value: 2 },
      { name: "Operations Manager", value: 4 },
      { name: "Marketing Manager", value: 6 },
      { name: "Sales Manager", value: 8 }
    ]
  }
]

// exports
module.exports = { questions, newDeptQuestions, newRoleQuestions, newEmployeeQuestions, updateEmployeeQuestions };