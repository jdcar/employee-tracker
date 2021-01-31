drop database if exists employee_tracker_db;
CREATE DATABASE employee_tracker_db;

use employee_tracker_db;

create table employees (
	employee_id INT NOT NULL auto_increment,
    firstName varchar  (30),
    lastName varchar (100),
	role_id INT(10),
    manager_id INT(10),
    primary key (employee_id)
);

CREATE TABLE role (
	role_id INT NOT NULL auto_increment,
	role VARCHAR(30),
	salary DECIMAL(15),
	department_id INT(10),
    primary key (role_id)
);
CREATE TABLE department (
	department_id INT(10) NOT NULL auto_increment,
	department_name VARCHAR(30),
    primary key (department_id)
);