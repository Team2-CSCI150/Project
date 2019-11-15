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
$studentid;
$classid;
$showWhat;
$entries = [];
if(isset($data))
{
	$request = json_decode($data,true);
	$studentid = $request["studentID"];
	$classid = $request["classID"];
	$showWhat = $request["showWhat"];
}

//Turn to readable string
$studentid = mysqli_real_escape_string($con,$studentid);
$classid = mysqli_real_escape_string($con,$classid);
$showWhat = mysqli_real_escape_string($con,$showWhat);
//strip slashes of string
$studentid=stripslashes($studentid);
$classid=stripslashes($classid);
$showWhat=stripslashes($showWhat);
//showWhat IDs whether to display the total grade of a given class or return a list of class assignments/exams

$sql = "SELECT AssignName,AssignType,MaxScore,Attempted FROM entries WHERE StudentID = '$studentid' and ClassID = '$classid'";
$result = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($result,MYSQLI_ASSOC))
{
	array_push($entries, $row);
}

$maxSum = 0;
$attSum = 0;
$response = [];
if(sizeof($entries) > 0)
{
	if($showWhat == "grades")
	{
		for($i=0; $i<sizeof($entries); $i++)
		{
			$maxSum += $entries[$i]["MaxScore"];
			$attSum += $entries[$i]["Attempted"];
		}
		$response[0] = "Get Grade Success!";
		array_push($response, $attSum/$maxSum);
	}
	else if($showWhat == "entries")
	{
		$response[0] = "Get Entries Success!";
		array_push($response, $entries);
	}
}
else
{
	$response = "There are either no entries for grading or invalid input <br>";
}

echo json_encode($response);
?>
