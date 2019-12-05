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
$studentID;
//$classNumber = [];
$classes = [];
$classesnames = [];
if(isset($data))
{
	$request = json_decode($data,true);
	$studentID = $request["studentID"];
}

//Turn to readable string
$studentID = mysqli_real_escape_string($con,$studentID);

//strip slashes of string
$studentID=stripslashes($studentID);

$sql = "SELECT * FROM students WHERE StudentID = '$studentID' ";

//Query from database
$result = mysqli_query($con,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);

//Get classes from query
$count = mysqli_num_rows($result);
$response = [];
if($count > 0)
{
	foreach($row as $classid)
	{
		if($classid >= 510100)
		{
			
			array_push($classes,$classid);
		}
	}
}
else
{
	$response = "No such student exists";
}

for($i=0; $i<sizeof($classes); $i++)
{
	$sql = "SELECT ClassName FROM classlist WHERE ClassID = '$classes[$i]'";
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
	$count = mysqli_num_rows($result);
	if($count > 0)
	{
		$classesnames[$classes[$i]] = $row['ClassName'];
	}
	else
	{
		$response = "Error in retrieving classes";
	}
	
}

if(sizeof($classesnames) > 0)
{
	$response[0] = "Get Classes Succes!";
	array_push($response, $classesnames);
}

echo json_encode($response);
?>
