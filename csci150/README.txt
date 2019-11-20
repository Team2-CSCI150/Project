Xampp Control Panel v3.2.4

Install Xampp: https://www.apachefriends.org/index.html

Should be relatively simple to install (install outside of C:/Program Files).
Once installed, go into the Xampp folder and run Xampp Control Panel as administrator.

You will see Apache and MySQL modules and under their respective actions, click start on both.

The modules should highlight green when on (if not, can easily troubleshoot for resolutions).

To check if Xampp is running correctly type in: localhost into a webbrowser.

To get these files working properly:
1. Go to C:/xampp/htdocs and create a folder called csci150. 
2. copy and paste dbconnect, log-in, and register.php files into folder.
3. In the Xampp Control Panel, click the MySQL Admin button (web browser for a visual database should show).
4. Create a database called: testdb
5. Import users.sql to testdb
6. You can add more entries using 'insert'
	a. in insert, scroll down until 'Continue insertion with __ rows'
	b. change to 1
	c. scroll back up, fill the values for each column
	d. scroll down and press go
	e. go back to browse to see the new entry
7. to erase contents of the database, go to Operations.
	a. scroll down until you see Empty the Table(TRUNCATE)
	b. use the option to erase all entries.


UPDATED 11/12/2019
New Files: getClasses.php, getEntries.php
students.sql,classlist.sql,entries.sql

Edited Files: Login.php
-To ensure that profile of user remains when navigating between pages



