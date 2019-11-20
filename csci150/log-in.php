<?php
if(isset($_SERVER['HTTP_ORIGIN']))
{
	header("Access-Control-Allow-Origin:{$_SERVER['HTTP_ORIGIN']}");
	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');
}

if($_SERVER['REQUEST_METHOD']=='OPTIONS')
{
	if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	exit(0);
}

require "dbconnect.php";
$data = file_get_contents("php://input");
$uid;
$upw;
if(isset($data)) {
	$request=json_decode($data,true);
	$uid=$request["uid"];
	$upw=$request["upw"];
}

//Get readable string to query from database as well as strip slashes to prevent unwanted functionality
$uid = mysqli_real_escape_string($con,$uid);
$upw = mysqli_real_escape_string($con,$upw);
$uid=stripslashes($uid);
$upw=stripslashes($upw);

//Get mysql query
$sql = "SELECT * FROM users WHERE UserID = '$uid' and UserPassword = '$upw'";

$result = mysqli_query($con,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);

$response = [];

$count = mysqli_num_rows($result);
//There must be active rows seen in database to get Login Success
if($count>0)
{
	//The profile registration must be activated (YES) to log in
	if($row["isRegistered"]=="YES")
	{
		$response[0] = "Login Success";
		$response[1] = $row["FirstName"];
		$response[2] = $row["LastName"];
	}
	else
	{
		$response[0] = "This profile is NOT registered";
	}
}
else
{
	$response[0] = "There is no Profile Suggested";
}


echo json_encode($response);
?>