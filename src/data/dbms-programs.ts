export const programs = [
  {
    id: 1,
    title: "1. Create Tables and Display All Records",
    filename: "Exp1_SelectAll.sql",
    code: `-- Program 1: Create Schema and Basic Selection
-- Executed by: {studentName} | {rollNumber}

CREATE TABLE Customers ( CustomerID INT PRIMARY KEY, CustomerName VARCHAR(50), City VARCHAR(50), Country VARCHAR(50), Age INT );
CREATE TABLE Orders ( OrderID INT PRIMARY KEY, CustomerID INT, OrderDate DATE, Amount DECIMAL(10,2), FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID) );
CREATE TABLE Employees ( EmpID INT PRIMARY KEY, EmpName VARCHAR(50), Department VARCHAR(50), Salary INT, ManagerID INT );

INSERT INTO Customers VALUES (1, 'Amit Sharma', 'Delhi', 'India', 30), (2, 'John Smith', 'New York', 'USA', 40), (3, 'Sara Khan', 'Mumbai', 'India', 25), (4, 'David Miller', 'London', 'UK', 35), (5, 'Priya Verma', 'Hyderabad', 'India', 28), (6, 'Michael Brown', 'Chicago', 'USA', 45), (7, 'Anjali Gupta', 'Jaipur', 'India', 22), (8, 'Robert Wilson', 'Toronto', 'Canada', 38);
INSERT INTO Orders VALUES (101, 1, '2024-01-10', 5000), (102, 2, '2024-01-12', 7000), (103, 3, '2024-02-05', 3000), (104, 1, '2024-02-20', 4500), (105, 5, '2024-03-15', 6000), (106, 7, '2024-03-18', 2000);
INSERT INTO Employees VALUES (1, 'Rahul Mehta', 'IT', 60000, NULL), (2, 'Sneha Reddy', 'HR', 45000, 1), (3, 'Arjun Patel', 'Finance', 55000, 1), (4, 'Neha Singh', 'IT', 65000, 1), (5, 'Vikram Rao', 'Sales', 40000, 2), (6, 'Pooja Sharma', 'HR', 42000, 2), (7, 'Karan Malhotra', 'IT', 70000, 1), (8, 'Meena Iyer', 'Finance', 50000, 3);

-- Q: Display all records from the Customers table.
SELECT * FROM Customers;
`,
    outputTemplate: `mysql> source Exp1_SelectAll.sql;
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.01 sec)
Query OK, 8 rows affected (0.00 sec)
Query OK, 6 rows affected (0.01 sec)
Query OK, 8 rows affected (0.00 sec)

+------------+---------------+-----------+---------+------+
| CustomerID | CustomerName  | City      | Country | Age  |
+------------+---------------+-----------+---------+------+
|          1 | Amit Sharma   | Delhi     | India   |   30 |
|          2 | John Smith    | New York  | USA     |   40 |
|          3 | Sara Khan     | Mumbai    | India   |   25 |
|          4 | David Miller  | London    | UK      |   35 |
|          5 | Priya Verma   | Hyderabad | India   |   28 |
|          6 | Michael Brown | Chicago   | USA     |   45 |
|          7 | Anjali Gupta  | Jaipur    | India   |   22 |
|          8 | Robert Wilson | Toronto   | Canada  |   38 |
+------------+---------------+-----------+---------+------+
8 rows in set (0.00 sec)`
  },
  {
    id: 2,
    title: "2. Display Specific Columns",
    filename: "Exp2_ProjectColumns.sql",
    code: `-- Program 2: Projections
-- Executed by: {studentName} | {rollNumber}

-- Q: Display only CustomerName and City from Customers.
SELECT CustomerName, City FROM Customers;
`,
    outputTemplate: `mysql> source Exp2_ProjectColumns.sql;
+---------------+-----------+
| CustomerName  | City      |
+---------------+-----------+
| Amit Sharma   | Delhi     |
| John Smith    | New York  |
| Sara Khan     | Mumbai    |
| David Miller  | London    |
| Priya Verma   | Hyderabad |
| Michael Brown | Chicago   |
| Anjali Gupta  | Jaipur    |
| Robert Wilson | Toronto   |
+---------------+-----------+
8 rows in set (0.00 sec)`
  },
  {
    id: 3,
    title: "3. Retrieving Unique Records",
    filename: "Exp3_DistinctKeys.sql",
    code: `-- Program 3: Distinct Keyword
-- Executed by: {studentName} | {rollNumber}

-- Q: Show unique list of countries from Customers.
SELECT DISTINCT Country FROM Customers;
`,
    outputTemplate: `mysql> source Exp3_DistinctKeys.sql;
+---------+
| Country |
+---------+
| India   |
| USA     |
| UK      |
| Canada  |
+---------+
4 rows in set (0.00 sec)`
  },
  {
    id: 4,
    title: "4. Filtering Rows Using WHERE",
    filename: "Exp4_WhereClause.sql",
    code: `-- Program 4: Numeric Filters
-- Executed by: {studentName} | {rollNumber}

-- Q: Display all employees with salary greater than 50,000.
SELECT * FROM Employees WHERE Salary > 50000;
`,
    outputTemplate: `mysql> source Exp4_WhereClause.sql;
+-------+----------------+------------+--------+-----------+
| EmpID | EmpName        | Department | Salary | ManagerID |
+-------+----------------+------------+--------+-----------+
|     1 | Rahul Mehta    | IT         |  60000 |      NULL |
|     3 | Arjun Patel    | Finance    |  55000 |         1 |
|     4 | Neha Singh     | IT         |  65000 |         1 |
|     7 | Karan Malhotra | IT         |  70000 |         1 |
+-------+----------------+------------+--------+-----------+
4 rows in set (0.00 sec)`
  },
  {
    id: 5,
    title: "5. Text Matching Filters",
    filename: "Exp5_StringMatch.sql",
    code: `-- Program 5: String Matching Filters
-- Executed by: {studentName} | {rollNumber}

-- Q: Show customers from India.
SELECT * FROM Customers WHERE Country = 'India';
`,
    outputTemplate: `mysql> source Exp5_StringMatch.sql;
+------------+--------------+-----------+---------+------+
| CustomerID | CustomerName | City      | Country | Age  |
+------------+--------------+-----------+---------+------+
|          1 | Amit Sharma  | Delhi     | India   |   30 |
|          3 | Sara Khan    | Mumbai    | India   |   25 |
|          5 | Priya Verma  | Hyderabad | India   |   28 |
|          7 | Anjali Gupta | Jaipur    | India   |   22 |
+------------+--------------+-----------+---------+------+
4 rows in set (0.00 sec)`
  },
  {
    id: 6,
    title: "6. Compound Conditions (AND)",
    filename: "Exp6_LogicalAnd.sql",
    code: `-- Program 6: Logical AND Operators
-- Executed by: {studentName} | {rollNumber}

-- Q: Display customers whose age is greater than 25 AND city is Delhi.
SELECT * FROM Customers WHERE Age > 25 AND City = 'Delhi';
`,
    outputTemplate: `mysql> source Exp6_LogicalAnd.sql;
+------------+-------------+-------+---------+------+
| CustomerID | CustomerName| City  | Country | Age  |
+------------+-------------+-------+---------+------+
|          1 | Amit Sharma | Delhi | India   |   30 |
+------------+-------------+-------+---------+------+
1 row in set (0.00 sec)`
  },
  {
    id: 7,
    title: "7. Compound Conditions (OR)",
    filename: "Exp7_LogicalOr.sql",
    code: `-- Program 7: Logical OR Operators
-- Executed by: {studentName} | {rollNumber}

-- Q: Show employees who work in HR OR IT department.
SELECT * FROM Employees WHERE Department = 'HR' OR Department = 'IT';
`,
    outputTemplate: `mysql> source Exp7_LogicalOr.sql;
+-------+----------------+------------+--------+-----------+
| EmpID | EmpName        | Department | Salary | ManagerID |
+-------+----------------+------------+--------+-----------+
|     1 | Rahul Mehta    | IT         |  60000 |      NULL |
|     2 | Sneha Reddy    | HR         |  45000 |         1 |
|     4 | Neha Singh     | IT         |  65000 |         1 |
|     6 | Pooja Sharma   | HR         |  42000 |         2 |
|     7 | Karan Malhotra | IT         |  70000 |         1 |
+-------+----------------+------------+--------+-----------+
5 rows in set (0.00 sec)`
  },
  {
    id: 8,
    title: "8. Negation Filtering (NOT)",
    filename: "Exp8_LogicalNot.sql",
    code: `-- Program 8: Logical NOT Operator
-- Executed by: {studentName} | {rollNumber}

-- Q: Display customers NOT from USA.
SELECT * FROM Customers WHERE Country != 'USA';
`,
    outputTemplate: `mysql> source Exp8_LogicalNot.sql;
+------------+---------------+-----------+---------+------+
| CustomerID | CustomerName  | City      | Country | Age  |
+------------+---------------+-----------+---------+------+
|          1 | Amit Sharma   | Delhi     | India   |   30 |
|          3 | Sara Khan     | Mumbai    | India   |   25 |
|          4 | David Miller  | London    | UK      |   35 |
|          5 | Priya Verma   | Hyderabad | India   |   28 |
|          7 | Anjali Gupta  | Jaipur    | India   |   22 |
|          8 | Robert Wilson | Toronto   | Canada  |   38 |
+------------+---------------+-----------+---------+------+
6 rows in set (0.00 sec)`
  },
  {
    id: 9,
    title: "9. Sorting Data (ORDER BY DESC)",
    filename: "Exp9_SortDesc.sql",
    code: `-- Program 9: Ordering Result Sets Descending
-- Executed by: {studentName} | {rollNumber}

-- Q: Sort employees by salary in descending order.
SELECT * FROM Employees ORDER BY Salary DESC;
`,
    outputTemplate: `mysql> source Exp9_SortDesc.sql;
+-------+----------------+------------+--------+-----------+
| EmpID | EmpName        | Department | Salary | ManagerID |
+-------+----------------+------------+--------+-----------+
|     7 | Karan Malhotra | IT         |  70000 |         1 |
|     4 | Neha Singh     | IT         |  65000 |         1 |
|     1 | Rahul Mehta    | IT         |  60000 |      NULL |
|     3 | Arjun Patel    | Finance    |  55000 |         1 |
|     8 | Meena Iyer     | Finance    |  50000 |         3 |
|     2 | Sneha Reddy    | HR         |  45000 |         1 |
|     6 | Pooja Sharma   | HR         |  42000 |         2 |
|     5 | Vikram Rao     | Sales      |  40000 |         2 |
+-------+----------------+------------+--------+-----------+
8 rows in set (0.00 sec)`
  },
  {
    id: 10,
    title: "10. Compound Sorting (Multiple Columns)",
    filename: "Exp10_SortMultiple.sql",
    code: `-- Program 10: Matrix Sorting Requirements
-- Executed by: {studentName} | {rollNumber}

-- Q: Sort customers by Country and then CustomerName.
SELECT * FROM Customers ORDER BY Country ASC, CustomerName ASC;
`,
    outputTemplate: `mysql> source Exp10_SortMultiple.sql;
+------------+---------------+-----------+---------+------+
| CustomerID | CustomerName  | City      | Country | Age  |
+------------+---------------+-----------+---------+------+
|          8 | Robert Wilson | Toronto   | Canada  |   38 |
|          1 | Amit Sharma   | Delhi     | India   |   30 |
|          7 | Anjali Gupta  | Jaipur    | India   |   22 |
|          5 | Priya Verma   | Hyderabad | India   |   28 |
|          3 | Sara Khan     | Mumbai    | India   |   25 |
|          4 | David Miller  | London    | UK      |   35 |
|          2 | John Smith    | New York  | USA     |   40 |
|          6 | Michael Brown | Chicago   | USA     |   45 |
+------------+---------------+-----------+---------+------+
8 rows in set (0.00 sec)`
  },
  {
    id: 11,
    title: "11. Inserting New Records",
    filename: "Exp11_InsertData.sql",
    code: `-- Program 11: Inserting Data Rows
-- Executed by: {studentName} | {rollNumber}

-- Q: Insert a new customer record into Customers table.
INSERT INTO Customers VALUES (9, 'Neha Patel', 'Pune', 'India', 26);
SELECT * FROM Customers WHERE CustomerID = 9;
`,
    outputTemplate: `mysql> source Exp11_InsertData.sql;
Query OK, 1 row affected (0.01 sec)

+------------+--------------+------+---------+------+
| CustomerID | CustomerName | City | Country | Age  |
+------------+--------------+------+---------+------+
|          9 | Neha Patel   | Pune | India   |   26 |
+------------+--------------+------+---------+------+
1 row in set (0.00 sec)`
  },
  {
    id: 12,
    title: "12. Updating Multiple Records",
    filename: "Exp12_UpdateData.sql",
    code: `-- Program 12: Conditional Data Update
-- Executed by: {studentName} | {rollNumber}

-- Q: Update salary of employees working in IT department by 10%.
UPDATE Employees SET Salary = Salary + (Salary * 0.10) WHERE Department = 'IT';
SELECT EmpName, Department, Salary FROM Employees WHERE Department = 'IT';
`,
    outputTemplate: `mysql> source Exp12_UpdateData.sql;
Query OK, 3 rows affected (0.01 sec)
Rows matched: 3  Changed: 3  Warnings: 0

+----------------+------------+--------+
| EmpName        | Department | Salary |
+----------------+------------+--------+
| Rahul Mehta    | IT         |  66000 |
| Neha Singh     | IT         |  71500 |
| Karan Malhotra | IT         |  77000 |
+----------------+------------+--------+
3 rows in set (0.00 sec)`
  },
  {
    id: 13,
    title: "13. Aggregate Functions (MAX & MIN)",
    filename: "Exp13_Aggregates.sql",
    code: `-- Program 13: Summary Statistics extraction
-- Executed by: {studentName} | {rollNumber}

-- Q: Find minimum salary of employees AND maximum order amount.
SELECT MIN(Salary) AS Minimum_Salary FROM Employees;
SELECT MAX(Amount) AS Maximum_Order_Amount FROM Orders;
`,
    outputTemplate: `mysql> source Exp13_Aggregates.sql;
+----------------+
| Minimum_Salary |
+----------------+
|          40000 |
+----------------+
1 row in set (0.00 sec)

+----------------------+
| Maximum_Order_Amount |
+----------------------+
|              7000.00 |
+----------------------+
1 row in set (0.00 sec)`
  },
  {
    id: 14,
    title: "14. Pattern Matching (LIKE and IN)",
    filename: "Exp14_PatternMatch.sql",
    code: `-- Program 14: LIKE, WILDCARDS and Array Sets
-- Executed by: {studentName} | {rollNumber}

-- Q: Find customers whose name starts with 'A'
SELECT * FROM Customers WHERE CustomerName LIKE 'A%';

-- Q: Display customers from cities (Delhi, Mumbai, Hyderabad).
SELECT * FROM Customers WHERE City IN ('Delhi', 'Mumbai', 'Hyderabad');
`,
    outputTemplate: `mysql> source Exp14_PatternMatch.sql;
+------------+--------------+--------+---------+------+
| CustomerID | CustomerName | City   | Country | Age  |
+------------+--------------+--------+---------+------+
|          1 | Amit Sharma  | Delhi  | India   |   30 |
|          7 | Anjali Gupta | Jaipur | India   |   22 |
+------------+--------------+--------+---------+------+
2 rows in set (0.00 sec)

+------------+--------------+-----------+---------+------+
| CustomerID | CustomerName | City      | Country | Age  |
+------------+--------------+-----------+---------+------+
|          1 | Amit Sharma  | Delhi     | India   |   30 |
|          3 | Sara Khan    | Mumbai    | India   |   25 |
|          5 | Priya Verma  | Hyderabad | India   |   28 |
+------------+--------------+-----------+---------+------+
3 rows in set (0.00 sec)`
  },
  {
    id: 15,
    title: "15. Table Joins (INNER JOIN)",
    filename: "Exp15_InnerJoin.sql",
    code: `-- Program 15: Cross References and INNER JOIN
-- Executed by: {studentName} | {rollNumber}

-- Q: Display customer name with their order amount using INNER JOIN.
SELECT c.CustomerName, o.Amount 
FROM Customers c 
INNER JOIN Orders o ON c.CustomerID = o.CustomerID;
`,
    outputTemplate: `mysql> source Exp15_InnerJoin.sql;
+--------------+---------+
| CustomerName | Amount  |
+--------------+---------+
| Amit Sharma  | 5000.00 |
| John Smith   | 7000.00 |
| Sara Khan    | 3000.00 |
| Amit Sharma  | 4500.00 |
| Priya Verma  | 6000.00 |
| Anjali Gupta | 2000.00 |
+--------------+---------+
6 rows in set (0.00 sec)`
  }
];
