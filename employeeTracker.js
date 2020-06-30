var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
const { isNullOrUndefined } = require("util");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "app",

  // Your password
  password: "root",
  database: "employeeProfiles_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Manager",
        "Update Employee Role",
        "View All Roles"
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          employeeView();
          break;

        case "View All Employees By Department":
          viewEmpbyDept();
          break;

        case "View All Employees By Manager":
          rangeSearch();
          break;

        case "Add Employee":
          addEmp();
          break;

        case "Remove Employee":
          deleteEmp();
          break;

        case "Update Employee Manager":
          updateEmpMan();
          break;

        case "Update Employee Role":
          updateEmpMan();
          break;
      }
    });
}

//Search All Employees Function 
function employeeView() {
  var query = "SELECT * FROM employeeprofiles_db.employeeData;";
  connection.query(query, function (err, res) {
    //console.table(res);
    console.table("\n", res);
    runSearch();
  });

}

//
function viewEmpbyDept() {
  var deptQuery = "SELECT * FROM employeeprofiles_db.departmentData;";
  connection.query(deptQuery, function (err, res) {
    //console.table(res);
    const choices = res.map(d => d.dept_Name)
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectDepartment',
          message: 'Select Department',
          choices
        },
      ])
      .then(function (answer) {
        var query = "SELECT * FROM employeeprofiles_db.employeeData WHERE department_id = ?";
        connection.query(query, [choices.indexOf(answer.selectDepartment) + 1], function (err, res) {
          console.table(res)
          runSearch();
        });
      });
  });

}

function addEmp() {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter employees first name.',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter employees last name.',
      },
      {
        name: "role",
        type: "rawlist",
        message: "What is your role within our organization?",
        choices: [
          "Intern",
          "Engineer",
          "Manager",
        ]
      },
      // {
      //   name: 'id',
      //   type: 'input',
      //   message: 'Enter your Employee ID.',
      // },
      // {
      //   name: 'email',
      //   type: 'input',
      //   message: 'Enter your email.'
      // }
    ])
    .then(answers => {
      console.info('Basic Data:', answers);
      switch (answers.role) {
        case "Intern":
          createIntern(answers);
          break;

        case "Engineer":
          createEngineer(answers);
          break;

        case "Manager":
          createManager(answers);
          break;
      }
    });
}
function createIntern(answers) {
  var deptQuery = "SELECT * FROM employeeprofiles_db.departmentData;";
  connection.query(deptQuery, function (err, res) {
    //console.table(res);
    const choices = res.map(d => d.dept_Name)
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectDepartment',
          message: 'Select Department',
          choices
        },
      ])
      .then(function (answer) {


        console.log("Inserting  new employee...\n");
        var query = connection.query(
          "INSERT INTO employeeData SET ?",
          {
            first_Name: answers.firstName,
            last_Name: answers.lastName,
            role_id: 1,
            manager_id: 3,
            department_id: answers.selectDepartment
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            runSearch();
          });
        console.log(query.sql);
      });
  });
}

function createEngineer() {
  var deptQuery = "SELECT * FROM employeeprofiles_db.departmentData;";
  connection.query(deptQuery, function (err, res) {
    //console.table(res);
    const choices = res.map(d => d.dept_Name)
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectDepartment',
          message: 'Select Department',
          choices
        },
      ])
      .then(function (answer) {


        console.log("Inserting  new employee...\n");
        var query = connection.query(
          "INSERT INTO employeeData SET ?",
          {
            first_Name: answers.firstName,
            last_Name: answers.lastName,
            role_id: 2,
            manager_id: 3,
            department_id: answers.selectDepartment
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            runSearch();
          });
        console.log(query.sql);
      });
  });
}

function createManager() {
  var deptQuery = "SELECT * FROM employeeprofiles_db.departmentData;";
  connection.query(deptQuery, function (err, res) {
    //console.table(res);
    const choices = res.map(d => d.dept_Name)
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectDepartment',
          message: 'Select Department',
          choices
        },
      ])
      .then(function (answer) {
        if (answer.selectDepartment === 'Action League Now') {
          deptNum = 1;
        }
        else if (answer.selectDepartment === 'Team Avatar') {
          deptNum = 2;
        }
        else if (answer.selectDepartment === 'The Fab Five') {
          deptNum = 3;
        }

        console.log("Inserting  new employee...\n");
        var query = connection.query(
          "INSERT INTO employeeData SET ?",
          {
            first_Name: answers.firstName,
            last_Name: answers.lastName,
            role_id: 3,
            manager_id: 3,
            department_id: deptNum
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            runSearch();
          });
        console.log(query.sql);
      });
  });
}
function deleteEmp() {
  var query = "SELECT * FROM employeeprofiles_db.employeeData;";
  connection.query(query, function (err, res) {
    //console.table(res);
    console.table("\n", res);
    inquirer
      .prompt({
        name: "deleteNum",
        type: "input",
        message: "Enter the ID number of the employee you wish to terminate."
      })
      .then(function (answer) {
        if (answer.deleteNum === undefined || answer.deleteNum === null) {
          console.log("Returning to Main Menu");
          runSearch(); 
        }
        else {
        console.log("Terminating Employee Number: " + answer.deleteNum);
        //runSearch();
        }
      })
      .then(function (answer) {
       console.log("Deleting employee...\n");
        connection.query(
          "DELETE FROM employeeData WHERE ?",
          {
            employeeData: answer.deleteNum
          },
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products deleted!\n");
            // Call runSearch AFTER the DELETE completes
            runSearch();
          }
        );
      });
    }); 
  }
