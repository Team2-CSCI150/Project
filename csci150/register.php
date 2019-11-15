<?php
if(isset($_SERVER['HTTP_ORIGIN']))
{
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');
}

if($_SERVER['REQUEST_METHOD']=='OPTIONS')
{
	if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers:		{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	exit(0);
}

require "dbconnect.php";
$data = file_get_contents("php://input");
$fname; 
$lname; 
$uid; 
$upw; 
$isReg;
$request;

if(isset($data))
{
	$request = json_decode($data,true);
	$fname = $request["fname"];
	$lname = $request["lname"];
	$uid = $request["uid"];
	$upw = $request["upw"];
}

//Turn to readable string
$uid = mysqli_real_escape_string($con,$uid);
$upw = mysqli_real_escape_string($con,$upw);
$fname = mysqli_real_escape_string($con,$fname);
$lname = mysqli_real_escape_string($con,$lname);

//strip slashes of string
$uid=stripslashes($uid);
$upw=stripslashes($upw);
$fname=stripslashes($fname);
$lname=stripslashes($lname);

//Get information from database User
$sql = "SELECT isRegistered FROM users WHERE FirstName = '$fname' and LastName = '$lname' and UserID = '$uid' and UserPassword = '$upw'";

//Query from database
$result = mysqli_query($con,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);

$response;
$count = mysqli_num_rows($result);
//The number of active rows in database must match the contents of given input from Ionic Form
if($count>0)
{
	//Check the isRegistered tag from database
	if($row["isRegistered"]=="" || $row["isRegistered"]=="NO")
	{
		//Update the isRegistered and ask if query returns true
		$regVal = "YES";
		$sql = "UPDATE users SET isRegistered = '$regVal' WHERE FirstName = '$fname' and LastName = '$lname' and UserID = '$uid' and UserPassword = '$upw'";
		if($con->query($sql) === TRUE)
		{
			$response = "Register Success";
		}
		else
		{
			$response = "Error Register Check: ".$sql."<br />".mysqli_connect_error()."<br/>";
		}
	}
	else
	{
		$response = "This profile is already registered";
	}
}
else
{
	$response = "There is no Profile Suggested";
}

print_r(json_encode($response));
?>