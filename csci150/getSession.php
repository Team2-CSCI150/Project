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
$day;
$classid;
if(isset($data))
{
	$request = json_decode($data,true);
	$classid = $request["classID"];
	$day = $request["day"];
}

//Turn to readable string
$classid = mysqli_real_escape_string($con,$classid);
$day = mysqli_real_escape_string($con,$day);
//strip slashes of string
$classid = stripslashes($classid);
$day = stripslashes($day);

$sql = "SELECT ClassID, Lattitude, Longitude, Variance FROM classinfo WHERE ClassID='$classid' AND WeekDays LIKE '%$day%' AND CURRENT_TIME BETWEEN StartTime AND EndTime";
$result = mysqli_query($con,$sql);
$out = mysqli_fetch_array($result,MYSQLI_ASSOC);

//Get coordinates from query
$count = mysqli_num_rows($result);
$response = [];
//Each classID is expected to be associated with only one entry in this db
if($count == 1)
{
	$response[0] = "Class is currently in session";
	array_push($response, $out["Lattitude"]);
	array_push($response, $out["Longitude"]);
	array_push($response, $out["Variance"]);
}
elseif ($count > 1) $response = "Error: this class has too many entries!";
else $response = "Class not found or is not in session";

echo json_encode($response);
?>
