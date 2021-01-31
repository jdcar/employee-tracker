const Employee = require("./lib/Employee")
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
start()
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
            if (answers.todo == 'View all employees') {
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

            console.log(answers)
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
            // {
            //     type: "input",
            //     name: "deptId",
            //     message: "Enter department ID"
            // },
        ])
        .then(answers => {
            console.log(answers)

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

            const employee = new Employee(response.firstName, response.lastName, response.roleId, response.managerId)


            console.log(employee)
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
        console.log(data)
        start()

    })

}


function viewAllRoles() {
    //    Display all roles
    connection.query(`SELECT * FROM role`, (err, data) => {
        if (err) throw err
        console.log(data)
        start()

    })

}

function viewAllEmployees() {
    // Display all employees
    connection.query(`SELECT * FROM employees`, (err, data) => {
        if (err) throw err
        console.log(data)
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
                name: "chooseEmployee",
                message: "Enter Employee's new role"
            },
        ])
        .then(answers => {
            console.log(answers)
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}