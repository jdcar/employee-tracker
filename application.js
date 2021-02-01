var inquirer = require('inquirer');
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_tracker_db"
});

connection.connect(err => {
    if (err) throw err
    console.log(`Connected as id ${connection.threadId}`)

    // getData()

})


const startQuestion = [
    {
        type: 'checkbox',
        message: 'What would you like to do?',
        name: "todo",
        choices: [

            // Create
            'Add Department',
            'Add Role',
            'Add Employee',
            // Read
            'View all Departments',
            'View all Roles',
            'View all employees',
            // Update
            'Update Employee Role'

            // Bonus
            // 'Update Employee Manager',  
            // 'View all Employees by Manager', 
            // 'View All Employees by Department', 
            // 'Remove Department',
            // 'Remove Role',
            // 'Remove Employee', 

        ]

    }

]
// start()
viewAllEmployees()

//
// viewAll(){
//     // working on view all
// connection.query(`SELECT employees.id, employees.firstName, employees.lastName, role. , department. , role.salary

// FROM employees
// FULL OUTER JOIN Customers 

// ON Orders.CustomerID=Customers.CustomerID;`, (err, data) => {
//     if (err) throw err
//     console.table(data)
//     start()

// })


// }

// 
function start() {
    inquirer
        .prompt(startQuestion)
        .then(answers => {

            if (answers.todo == 'Add Department') {
                addDepartment(answers.todo)

            }
            if (answers.todo == 'Add Role') {

                addRole(answers.todo)
            }
            if (answers.todo == 'Add Employee') {
                addEmployee(answers.todo)
            }
            if (answers.todo == 'View all Departments') {
                viewAllDepartments(answers.todo)
            }
            if (answers.todo == 'View all Roles') {
                viewAllRoles(answers.todo)
            }
            if (answers.todo == 'View all employees') {
                viewAllEmployees(answers.todo)
            }
            if (answers.todo == 'Update Employee Role') {
                updateEmployeeRole(answers.todo)
            }
            

            // console.log(answers)
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "addDepartment",
                message: "Enter new department name"
            },
        ])
        .then(answers => {

            var query = connection.query(
                "INSERT INTO department SET ?",
                {
                    departmentName: answers.addDepartment
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows);
                    // Call updateProduct AFTER the INSERT completes
                }
            );

            // logs the actual query being run
            console.log(query.sql);
            start();

            // Add new department to the table
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}


function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "addRole",
                message: "Enter new role title"
            },
            {
                type: "input",
                name: "addSalary",
                message: "Enter new role salary"
            },
            {
                type: "input",
                name: "deptId",
                message: "Enter department ID"
            },
        ])
        .then(answers => {
            var query = connection.query(
                "INSERT INTO role SET ?",
                {
                    role: answers.addRole,
                    salary: answers.addSalary,
                    departmentId: answers.deptId
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows);
                    // Call updateProduct AFTER the INSERT completes
                }
            );

            // logs the actual query being run
            console.log(query.sql);
            start();
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter new Employee first name"
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter new Employee last name"
            },
            {
                type: "input",
                name: "roleId",
                message: "Enter new Employee's role id"
            },
            {
                type: "input",
                name: "managerId",
                message: "Enter new Employee's manager's id"
            },
        ])
        .then(response => {

            var query = connection.query(
                "INSERT INTO employees SET ?",
                {
                    firstName: response.firstName,
                    lastName: response.lastName,
                    roleId: response.roleId,
                    managerId: response.managerId
                },

                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows);
                    // Call updateProduct AFTER the INSERT completes
                }

            );
            console.log(query.sql);
            start();

        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}

function viewAllDepartments() {
    // Display all departments


    connection.query(`SELECT * FROM department`, (err, data) => {
        if (err) throw err
        console.table(data)
        start()

    })

}


function viewAllRoles() {
    //    Display all roles
    connection.query(`SELECT * FROM role`, (err, data) => {
        if (err) throw err
        console.table(data)
        start()

    })

}

function viewAllEmployees() {
    // Display all employees
    connection.query(`SELECT * FROM employees`, (err, data) => {
        if (err) throw err
        console.table(data)
        start()
    })
}

function updateEmployeeRole() {


    inquirer
        .prompt([
            {
                type: "input",
                name: "chooseEmployee",
                message: "Enter Employee name"
            },
            {
                type: "input",
                name: "chooseRoleId",
                message: "Enter Employee's new role ID"
            },
        ])
        .then(answers => {
            var query = connection.query(
                `UPDATE employees SET "roleId" WHERE "${answers.chooseEmployee}"`,
                [
                    {
                        roleId: answers.chooseRoleId
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows);
                  // Call deleteProduct AFTER the UPDATE completes
                  
                }
            );

            // logs the actual query being run
            console.log(query.sql);
            start();



        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}