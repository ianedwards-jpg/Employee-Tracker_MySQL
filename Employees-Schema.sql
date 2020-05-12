DROP DATABASE IF EXISTS employeeProfiles_DB;
CREATE database employeeProfiles_DB;

USE employeeProfiles_DB;

CREATE TABLE departmentData (
  id INT NOT NULL AUTO_INCREMENT,
  dept_Name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roleData (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NULL, 
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employeeData (
  id INT NOT NULL AUTO_INCREMENT,
  first_Name VARCHAR(30) NOT NULL,
  last_Name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

