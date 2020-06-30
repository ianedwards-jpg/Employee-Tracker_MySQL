var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
          remEmp();
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
    .then (answers =>  {
      console.info('Basic Data:', answers);
      switch (answers.role) {
        case "Intern":
          createIntern();
          break;

        case "Engineer":
          createEngineer();
          break;

        case "Manager":
          createManager();
          break;
      }
    });
}
function createIntern() {
  console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO employeeData SET ?",
    {
      first_Name: answer.firstName,
      last_Name: answer.lastName,
      role_id: 1,
      manager_id: ,
      department_id: 
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      runSearch();
    }
  )
};

function createEngineer() {
  console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products (first_Name, last_Name, role_id, manager_id, department_id, quantity)",
    {
      flavor: "Rocky Road",
      price: 3.0,
      quantity: 50
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      runSearch();
    }
  )
};

function createManager() {
  console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products (first_Name, last_Name, role_id, manager_id, department_id, quantity)",
    {
      flavor: "Rocky Road",
      price: 3.0,
      quantity: 50
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      runSearch();
    }
  )
};



// function songSearch() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function (answer) {
//       console.log(answer.song);
//       connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function (err, res) {
//         console.log(
//           "Position: " +
//           res[0].position +
//           " || Song: " +
//           res[0].song +
//           " || Artist: " +
//           res[0].artist +
//           " || Year: " +
//           res[0].year
//         );
//         runSearch();
//       });
//     });
// }

// function songAndAlbumSearch() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function (answer) {
//       var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

//       connection.query(query, [answer.artist, answer.artist], function (err, res) {
//         console.log(res.length + " matches found!");
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             i + 1 + ".) " +
//             "Year: " +
//             res[i].year +
//             " Album Position: " +
//             res[i].position +
//             " || Artist: " +
//             res[i].artist +
//             " || Song: " +
//             res[i].song +
//             " || Album: " +
//             res[i].album
//           );
//         }

//         runSearch();
//       });
//     });
// }
