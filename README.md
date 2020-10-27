# MySQL Employee Tracker

This application uses a MySQL database and Node.js to create, read, update, and delete employee records. 

## Design

The database was created using the following three table schema:

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  

## User Story 

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```


![Employee Tracker](Assets/employee-tracker.gif)

### Properties 

* This database was pre-populated using a `seed.sql` file in accordance with the schema parameters.

* This applicaiton runs via a command-line interface using the console in your code editor.

## Functionality

This command-line application allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles
  
  * Update employee managers

  * View employees by manager
  
  * Delete departments, roles, and employees


