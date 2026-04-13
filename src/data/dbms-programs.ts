export const programs = [
  {
    id: 1,
    title: "Experiment 1: Convert Entities and Relationships to Relation Table",
    filename: "Exp1_SchemaDesign.sql",
    code: `-- Experiment 1: Schema Diagram Mapping
-- Executed by: {studentName} | {rollNumber}

-- 1. COLLEGE DATABASE SCHEMA
CREATE TABLE STUDENT (USN VARCHAR(20) PRIMARY KEY, SName VARCHAR(50), Address VARCHAR(100), Phone VARCHAR(15), Gender CHAR(1));
CREATE TABLE SEMSEC (SSID VARCHAR(10) PRIMARY KEY, Sem INT, Sec CHAR(1));
CREATE TABLE CLASS (USN VARCHAR(20), SSID VARCHAR(10), FOREIGN KEY(USN) REFERENCES STUDENT(USN), FOREIGN KEY(SSID) REFERENCES SEMSEC(SSID));
CREATE TABLE SUBJECT (Subcode VARCHAR(10) PRIMARY KEY, Title VARCHAR(50), Sem INT, Credits INT);
CREATE TABLE IAMARKS (USN VARCHAR(20), Subcode VARCHAR(10), SSID VARCHAR(10), Test1 INT, Test2 INT, Test3 INT, FinalIA INT, FOREIGN KEY(USN) REFERENCES STUDENT(USN), FOREIGN KEY(Subcode) REFERENCES SUBJECT(Subcode), FOREIGN KEY(SSID) REFERENCES SEMSEC(SSID));

-- 2. COMPANY DATABASE SCHEMA
CREATE TABLE EMPLOYEE_COMP (SSN VARCHAR(20) PRIMARY KEY, Name VARCHAR(50), Address VARCHAR(100), Sex CHAR(1), Salary DECIMAL(10,2), SuperSSN VARCHAR(20), DNo INT);
CREATE TABLE DEPARTMENT (DNo INT PRIMARY KEY, DName VARCHAR(50), MgrSSN VARCHAR(20), MgrStartDate DATE);
CREATE TABLE DLOCATION (DNo INT, DLoc VARCHAR(50), FOREIGN KEY(DNo) REFERENCES DEPARTMENT(DNo));
CREATE TABLE PROJECT (PNo INT PRIMARY KEY, PName VARCHAR(50), PLocation VARCHAR(50), DNo INT, FOREIGN KEY(DNo) REFERENCES DEPARTMENT(DNo));
CREATE TABLE WORKS_ON (SSN VARCHAR(20), PNo INT, Hours DECIMAL(5,2), FOREIGN KEY(SSN) REFERENCES EMPLOYEE_COMP(SSN), FOREIGN KEY(PNo) REFERENCES PROJECT(PNo));

SELECT 'COLLEGE DATABASE and COMPANY DATABASE Schemas constructed successfully' AS Status;
`,
    outputTemplate: `mysql> source Exp1_SchemaDesign.sql;
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.02 sec)
Query OK, 0 rows affected (0.02 sec)

Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.01 sec)

+------------------------------------------------------------------------+
| Status                                                                 |
+------------------------------------------------------------------------+
| COLLEGE DATABASE and COMPANY DATABASE Schemas constructed successfully |
+------------------------------------------------------------------------+
1 row in set (0.00 sec)`
  },
  {
    id: 2,
    title: "Experiment 2: Relational Algebra Queries (MOVIE DATABASE)",
    filename: "Exp2_RelationalAlgebra.sql",
    code: `-- Experiment 2: Relational Algebra Queries on MOVIE DATABASE
-- Executed by: {studentName} | {rollNumber}

-- Database Initialisation
CREATE TABLE Movies (title VARCHAR(50), director VARCHAR(50), myear INT, rating DECIMAL(3,1));
CREATE TABLE Acts (actor VARCHAR(50), title VARCHAR(50));
INSERT INTO Movies VALUES ('Fargo', 'Coen', 1996, 8.1), ('The Big Lebowski', 'Coen', 1998, 8.1), ('L.A. Confidential', 'Hanson', 1997, 8.2), ('8 Mile', 'Hanson', 2002, 7.2);
INSERT INTO Acts VALUES ('McDormand', 'Fargo'), ('Bridges', 'The Big Lebowski'), ('Eminem', '8 Mile');

-- 1. Find movies made after 1997; σ_myear>1997 (Movies)
SELECT * FROM Movies WHERE myear > 1997;

-- 2. Find movies made by Hanson after 1997
SELECT * FROM Movies WHERE director = 'Hanson' AND myear > 1997;

-- 3. Find all movies and their ratings; π_title,rating (Movies)
SELECT title, rating FROM Movies;

-- 4. Find all actors and directors; π_actor(Acts) ∪ π_director(Movies)
SELECT actor AS Name FROM Acts
UNION
SELECT director AS Name FROM Movies;

-- 5. Find Coen's movies with McDormand; π_title(σ_actor="McDormand"(Acts)) ∩ π_title(σ_director="Coen"(Movies))
SELECT m.title 
FROM Movies m 
JOIN Acts a ON m.title = a.title 
WHERE m.director = 'Coen' AND a.actor = 'McDormand';
`,
    outputTemplate: `mysql> source Exp2_RelationalAlgebra.sql;
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
Query OK, 4 rows affected (0.00 sec)
Query OK, 3 rows affected (0.00 sec)

+------------------+----------+-------+--------+
| title            | director | myear | rating |
+------------------+----------+-------+--------+
| The Big Lebowski | Coen     |  1998 |    8.1 |
| 8 Mile           | Hanson   |  2002 |    7.2 |
+------------------+----------+-------+--------+
2 rows in set (0.00 sec)

+--------+----------+-------+--------+
| title  | director | myear | rating |
+--------+----------+-------+--------+
| 8 Mile | Hanson   |  2002 |    7.2 |
+--------+----------+-------+--------+
1 row in set (0.00 sec)

+-------------------+--------+
| title             | rating |
+-------------------+--------+
| Fargo             |    8.1 |
| The Big Lebowski  |    8.1 |
| L.A. Confidential |    8.2 |
| 8 Mile            |    7.2 |
+-------------------+--------+
4 rows in set (0.00 sec)

+-----------+
| Name      |
+-----------+
| McDormand |
| Bridges   |
| Eminem    |
| Coen      |
| Hanson    |
+-----------+
5 rows in set (0.00 sec)

+-------+
| title |
+-------+
| Fargo |
+-------+
1 row in set (0.00 sec)`
  },
  {
    id: 3,
    title: "Experiment 3: Northwind Database Operations",
    filename: "Exp3_Northwind.sql",
    code: `-- Experiment 3: Northwind Database Operations
-- Executed by: {studentName} | {rollNumber}

-- 1. Create northwind database
CREATE DATABASE IF NOT EXISTS northwind;

-- 2. Viewing all databases
SHOW DATABASES;

USE northwind;

-- 4. Creating Tables customers and employees
CREATE TABLE IF NOT EXISTS customers ( 
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  company VARCHAR(50) NULL DEFAULT NULL, 
  last_name VARCHAR(50) NULL DEFAULT NULL, 
  first_name VARCHAR(50) NULL DEFAULT NULL, 
  city VARCHAR(50) NULL DEFAULT NULL 
);

CREATE TABLE IF NOT EXISTS employees ( 
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  company VARCHAR(50) NULL DEFAULT NULL, 
  last_name VARCHAR(50) NULL DEFAULT NULL, 
  first_name VARCHAR(50) NULL DEFAULT NULL, 
  job_title VARCHAR(50) NULL DEFAULT NULL 
);

-- 3. Viewing all Tables in a northwind Database
SHOW TABLES;

-- 5. Inserting in a Table
INSERT INTO customers (company, last_name, first_name, city) VALUES 
('Company A', 'Bedecs', 'Anna', 'Seattle'),
('Company B', 'Gratacos Solsona', 'Antonio', 'Boston');

INSERT INTO employees (company, last_name, first_name, job_title) VALUES 
('Northwind Traders', 'Freehafer', 'Nancy', 'Sales Representative'),
('Northwind Traders', 'Cencini', 'Andrew', 'Vice President, Sales');

SELECT * FROM customers LIMIT 2;
`,
    outputTemplate: `mysql> source Exp3_Northwind.sql;
Query OK, 1 row affected (0.01 sec)

+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| northwind          |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

Database changed
Query OK, 0 rows affected (0.02 sec)
Query OK, 0 rows affected (0.02 sec)

+---------------------+
| Tables_in_northwind |
+---------------------+
| customers           |
| employees           |
+---------------------+
2 rows in set (0.00 sec)

Query OK, 2 rows affected (0.01 sec)
Records: 2  Duplicates: 0  Warnings: 0
Query OK, 2 rows affected (0.01 sec)
Records: 2  Duplicates: 0  Warnings: 0

+----+-----------+------------------+------------+---------+
| id | company   | last_name        | first_name | city    |
+----+-----------+------------------+------------+---------+
|  1 | Company A | Bedecs           | Anna       | Seattle |
|  2 | Company B | Gratacos Solsona | Antonio    | Boston  |
+----+-----------+------------------+------------+---------+
2 rows in set (0.00 sec)`
  },
  {
    id: 4,
    title: "Experiment 4: Altering Table (DEPT)",
    filename: "Exp4_DeptAlter.sql",
    code: `-- Experiment 4: Consider Dept table and Altering Constraints
-- Executed by: {studentName} | {rollNumber}

CREATE TABLE DEPT (DEPTNO INTEGER PRIMARY KEY, DNAME VARCHAR(10), LOC VARCHAR(4));

-- 1. Rename the table dept as department
ALTER TABLE DEPT RENAME TO DEPARTMENT;
SELECT 'Table altered.' AS Status;

-- 2. Add a new column PINCODE with not null constraints to the existing table
ALTER TABLE DEPARTMENT ADD (PINCODE INT NOT NULL);
DESC DEPARTMENT;

-- 3. Drop column LOC
ALTER TABLE DEPARTMENT DROP COLUMN LOC;
SELECT 'Table altered.' AS Status;

-- 4. Rename the column DNAME to DEPT_NAME in dept table
ALTER TABLE DEPARTMENT CHANGE DNAME Dept_Name VARCHAR(100);
DESC DEPARTMENT;

-- 5. Change the datatype of column pincode as CHAR with size 10
ALTER TABLE DEPARTMENT MODIFY COLUMN PINCODE CHAR(10);
DESC DEPARTMENT;

-- 6. Delete table
DROP TABLE DEPARTMENT;
SELECT 'Table dropped.' AS Status;
`,
    outputTemplate: `mysql> source Exp4_DeptAlter.sql;
Query OK, 0 rows affected (0.02 sec)

Query OK, 0 rows affected (0.02 sec)
+----------------+
| Status         |
+----------------+
| Table altered. |
+----------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.01 sec)
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| DEPTNO  | int(11)     | NO   | PRI | NULL    |       |
| DNAME   | varchar(10) | YES  |     | NULL    |       |
| LOC     | varchar(4)  | YES  |     | NULL    |       |
| PINCODE | int(11)     | NO   |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
4 rows in set (0.00 sec)

Query OK, 0 rows affected (0.02 sec)
+----------------+
| Status         |
+----------------+
| Table altered. |
+----------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.01 sec)
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| DEPTNO    | int(11)      | NO   | PRI | NULL    |       |
| Dept_Name | varchar(100) | YES  |     | NULL    |       |
| PINCODE   | int(11)      | NO   |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+
3 rows in set (0.00 sec)

Query OK, 0 rows affected (0.02 sec)
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| DEPTNO    | int(11)      | NO   | PRI | NULL    |       |
| Dept_Name | varchar(100) | YES  |     | NULL    |       |
| PINCODE   | char(10)     | YES  |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+
3 rows in set (0.00 sec)

Query OK, 0 rows affected (0.01 sec)
+----------------+
| Status         |
+----------------+
| Table dropped. |
+----------------+
1 row in set (0.00 sec)`
  },
  {
    id: 5,
    title: "Experiment 5: Queries on EMPLOYEE table",
    filename: "Exp5_EmployeeQueries.sql",
    code: `-- Experiment 5: Consider Employee table and Queries
-- Executed by: {studentName} | {rollNumber}

CREATE TABLE EMPLOYEE (
  EMPNO VARCHAR(20) PRIMARY KEY, EMP_NAME VARCHAR(20), DEPT VARCHAR(20), 
  salary INTEGER, DOJ DATE, branch VARCHAR(20)
);

INSERT INTO EMPLOYEE VALUES
('E101', 'Amit', 'production', 45000, '2000-03-12', 'Bangalore'),
('E102', 'sunita', 'HR', 70000, '2019-07-03', 'Bangalore'),
('E103', 'sunita', 'management', 120000, '2019-01-11', 'mysore'),
('E104', 'Amit', 'IT', 67000, '2020-08-01', 'Bangalore'),
('E105', 'mahesh', 'Civil', 145000, '2020-09-12', 'mumbai'),
('E106', 'Amit', 'IT', 67000, '2020-03-12', 'Bangalore');

-- 1. Display all the fields of employee table
SELECT * FROM EMPLOYEE;

-- 2. Retrieve employee number and their salary
SELECT EMPNO, salary FROM EMPLOYEE;

-- 3. Retrieve average salary of all employee
SELECT AVG(salary) FROM EMPLOYEE;

-- 4. Retrieve number of employee
SELECT COUNT(*) FROM EMPLOYEE;

-- 5. Retrieve total salary of employee group by employee name and count similar names
SELECT EMP_NAME, SUM(salary), COUNT(*) FROM EMPLOYEE GROUP BY EMP_NAME;

-- 6. Retrieve total salary of employee which is greater than >120000 (Adjusted 145000)
SELECT EMP_NAME, SUM(salary) FROM EMPLOYEE GROUP BY EMP_NAME HAVING SUM(salary) >= 145000;

-- 7. Display name of employee in descending order
SELECT EMP_NAME FROM EMPLOYEE ORDER BY EMP_NAME DESC;

-- 8. Display name of employee in ascending order
SELECT EMP_NAME FROM EMPLOYEE ORDER BY EMP_NAME ASC;

-- 9. Display details of employee whose name is AMIT and salary greater than 50000
SELECT * FROM EMPLOYEE WHERE EMP_NAME='Amit' AND salary > 50000;
`,
    outputTemplate: `mysql> source Exp5_EmployeeQueries.sql;
Query OK, 0 rows affected (0.01 sec)
Query OK, 6 rows affected (0.00 sec)

+-------+----------+------------+--------+------------+-----------+
| EMPNO | EMP_NAME | DEPT       | salary | DOJ        | branch    |
+-------+----------+------------+--------+------------+-----------+
| E101  | Amit     | production |  45000 | 2000-03-12 | Bangalore |
| E102  | sunita   | HR         |  70000 | 2019-07-03 | Bangalore |
| E103  | sunita   | management | 120000 | 2019-01-11 | mysore    |
| E104  | Amit     | IT         |  67000 | 2020-08-01 | Bangalore |
| E105  | mahesh   | Civil      | 145000 | 2020-09-12 | mumbai    |
| E106  | Amit     | IT         |  67000 | 2020-03-12 | Bangalore |
+-------+----------+------------+--------+------------+-----------+
6 rows in set (0.00 sec)

+-------+--------+
| EMPNO | salary |
+-------+--------+
| E101  |  45000 |
| E102  |  70000 |
| E103  | 120000 |
| E104  |  67000 |
| E105  | 145000 |
| E106  |  67000 |
+-------+--------+
6 rows in set (0.00 sec)

+-------------+
| AVG(salary) |
+-------------+
|  85666.6667 |
+-------------+
1 row in set (0.00 sec)

+----------+
| COUNT(*) |
+----------+
|        6 |
+----------+
1 row in set (0.00 sec)

+----------+-------------+----------+
| EMP_NAME | SUM(salary) | COUNT(*) |
+----------+-------------+----------+
| Amit     |      179000 |        3 |
| sunita   |      190000 |        2 |
| mahesh   |      145000 |        1 |
+----------+-------------+----------+
3 rows in set (0.00 sec)

+----------+-------------+
| EMP_NAME | SUM(salary) |
+----------+-------------+
| Amit     |      179000 |
| sunita   |      190000 |
| mahesh   |      145000 |
+----------+-------------+
3 rows in set (0.00 sec)

+----------+
| EMP_NAME |
+----------+
| sunita   |
| sunita   |
| mahesh   |
| Amit     |
| Amit     |
| Amit     |
+----------+
6 rows in set (0.00 sec)

+----------+
| EMP_NAME |
+----------+
| Amit     |
| Amit     |
| Amit     |
| mahesh   |
| sunita   |
| sunita   |
+----------+
6 rows in set (0.00 sec)

+-------+----------+------+--------+------------+-----------+
| EMPNO | EMP_NAME | DEPT | salary | DOJ        | branch    |
+-------+----------+------+--------+------------+-----------+
| E104  | Amit     | IT   |  67000 | 2020-08-01 | Bangalore |
| E106  | Amit     | IT   |  67000 | 2020-03-12 | Bangalore |
+-------+----------+------+--------+------------+-----------+
2 rows in set (0.00 sec)`
  }
];
