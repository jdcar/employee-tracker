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
})

const startQuestion = [
    {
        type: 'list',
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
            'Update Employee Role',
            'Exit'

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

viewAll()

function viewAll() {
    // working on view all
    connection.query(`SELECT e.*, CONCAT (m.firstName, ' ', m.lastName) AS manager FROM employees AS e
    LEFT JOIN employees AS m ON e.managerId = m.employeeId;`, (err, data) => {
        if (err) throw err
        console.table(data)
        start()
    })

}

function start() {
    inquirer
        .prompt(startQuestion)
        .then(answers => {

            if (answers.todo == 'Add Department') {
                connection.query(`SELECT * FROM department`, (err, data) => {
                    if (err) throw err
                    console.table(data)
                    addDepartment(answers.todo)
                })

            }
            if (answers.todo == 'Add Role') {
                connection.query("SELECT * FROM role", (err, data) => {
                    if (err) throw err
                    console.table(data)
                    addRole(answers.todo)
                })

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
            } else if (answers.todo == 'Exit') {
                process.exit()
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

    const departmentArray = []
    connection.query(`SELECT department.departmentName, department.departmentId FROM department;`, (err, data) => {
        if (err) throw err
        data.forEach(element => departmentArray.push(element.departmentName))
    })

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
                type: "list",
                name: "department_name",
                message: "Select department",
                choices: departmentArray
            },
        ])
        .then(answers => {

            connection.query(`SELECT department.departmentId FROM department WHERE departmentName = "${answers.department_name}";`, (err, data) => {
                if (err) throw err
                const dept_id = data[0].departmentId
                console.log(dept_id)

                var query = connection.query(
                    "INSERT INTO role SET ?",
                    {
                        role: answers.addRole,
                        salary: answers.addSalary,
                        departmentId: dept_id
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
    const roleArray = []
    connection.query(`SELECT roleId, role FROM role`, (err, data) => {
        if (err) throw err
        data.forEach(element => roleArray.push(element.role))
    })

    const managersArray = []
    connection.query(`SELECT CONCAT (employees.firstName, ' ', employees.lastName) AS manager FROM employees;`, (err, data) => {
        if (err) throw err

        data.forEach(element => managersArray.push(element.manager))
        // console.log(managersArray)
    })
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
                type: "list",
                name: "role",
                message: "Select new Employee's role",
                choices: roleArray
            },
            {
                type: "list",
                name: "manager",
                message: "Select new Employee's manager",
                choices: managersArray
            },
        ])
        .then(answers => {
            // 
            connection.query(`SELECT roleId, role FROM role WHERE role = "${answers.role}"`, (err, data) => {
                if (err) throw err
                const role_id = data[0].roleId
                console.log(role_id)

                connection.query(`SELECT * , CONCAT (employees.firstName, ' ', employees.lastName) AS manager FROM employees WHERE CONCAT (employees.firstName, ' ', employees.lastName) = "${answers.manager}";`, (err, data) => {
                    if (err) throw err
                    const manager_id = data[0].employeeId


                    var query = connection.query(
                        "INSERT INTO employees SET ?",
                        {
                            firstName: answers.firstName,
                            lastName: answers.lastName,
                            roleId: role_id,
                            managerId: manager_id
                        },

                        function (err, res) {

                            if (err) throw err;
                            console.log(res.affectedRows);
                            console.log(query.sql);
                            // Call updateProduct AFTER the INSERT completes

                        }

                    );
                    console.log(query.sql);
                    start();
                })
            })
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

    connection.query(`SELECT * FROM department`, (err, data) => {
        if (err) throw err
        console.table(data)
        start()
    })
}

function viewAllRoles() {
    //    Display all roles
    connection.query(`SELECT * FROM role LEFT JOIN department ON role.departmentId = department.departmentId`, (err, data) => {
        if (err) throw err
        console.table(data)
        start()
    })
}

function viewAllEmployees() {
    // Display all employees
    connection.query(`SELECT e.*, CONCAT (m.firstName, ' ', m.lastName) AS manager FROM employees AS e
    LEFT JOIN employees AS m ON e.managerId = m.employeeId;`, (err, data) => {
        if (err) throw err
        console.table(data)
        start()
    })
}

function updateEmployeeRole() {

    const roleArray = []
    connection.query(`SELECT roleId, role FROM role`, (err, data) => {
        if (err) throw err
        data.forEach(element => roleArray.push(element.role))
    })

    const employeesArray = []
    connection.query(`SELECT employees.firstName, employees.lastName FROM employees`, (err, data) => {
        if (err) throw err
        // console.log(data)
        data.forEach(element => employeesArray.push(element.firstName + " " + element.lastName))

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "chooseEmployee",
                    message: "Select employee name",
                    choices: employeesArray
                },
                {
                    type: "list",
                    name: "chooseRole",
                    message: "Select Employee's new role",
                    choices: roleArray
                },
            ])
            .then(answers => {
      
                connection.query(`SELECT roleId FROM role WHERE role = "${answers.chooseRole}";`, (err, data) => {
                    if (err) throw err
                    const role_id = data[0].roleId
                    console.log(role_id)
                    console.log(answers.chooseRole)
                    console.log(answers.chooseEmployee)

                    connection.connect(function (err) {
                        if (err) throw err;
                        var sql = `UPDATE employees SET roleId = "${role_id}" WHERE CONCAT (employees.firstName, " " , employees.lastName) = "${answers.chooseEmployee}"`;
                        connection.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log(result);
                            
                        });
                        
                    });
                    start();
                })
            })
    }).catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
    });
}

