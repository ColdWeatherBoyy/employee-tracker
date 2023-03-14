// SELECT SQL command for showing department tables
const selectDepts = "SELECT * FROM departments;"

// SELECT and JOIN for showing roles with joined data
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

// SELECT and JOIN for showing employees table with joined data
const selectEmployees = `
  SELECT 
    employee.id AS Employee_ID, 
    employee.first_name AS First_Name, 
    employee.last_name AS Last_Name, 
    title AS Job_Title, 
    name AS Department_name, 
    salary AS Salary,
    CONCAT(manager.first_name, " ", manager.last_name) AS Manager_Name
    FROM employee
    JOIN role
    ON role.id = employee.role_id
    JOIN department
    ON department.id = role.department_id
    LEFT JOIN employee AS Manager
    ON employee.manager_id = manager.id;
`;

const insertDept = `
  INSERT INTO department (name)
  VALUES (?)
`;

const insertRole = `
  INSERT INTO role (title, salary, department_id) 
  VALUES (?, ?, ?)
`;

// export
module.exports = { selectDepts, selectRoles, selectEmployees, insertDept, insertRole };