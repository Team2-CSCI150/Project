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
$student_id;
$event_name;
$event_desc;
$start_time;
$end_time;
$stuff=[];


if(isset($data))
{
	$request = json_decode($data,true);
	$student_id = $request["student_id"];
	$event_name = $request["event_name"];
	$event_desc = $request["event_desc"];
	$start_time= $request["start_time"];
	$end_time= $request["end_time"];

}

//Turn to readable string
$student_id = mysqli_real_escape_string($con,$student_id);
$event_name = mysqli_real_escape_string($con,$event_name);
$event_desc = mysqli_real_escape_string($con,$event_desc);
$start_time = mysqli_real_escape_string($con, $start_time);
$end_time = mysqli_real_escape_string($con, $end_time);

//strip slashes of string
$student_id=stripslashes($student_id);
$event_name = stripslashes($con,$event_name);
$event_desc = stripslashes($con,$event_desc);
$start_time = stripslashes($con, $start_time);
$end_time = stripslashes($con, $end_time);


$sql = "SELECT event_name, event_desc, strat_time, end_time FROM event WHERE student_id = '$student_id'";
$result = mysqli_query($con,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);

$count = mysqli_num_rows($result);
$response = [];
if($count > 0)
{
	foreach($row as $student_id)
	{
		if($student_id >= 510100)
		{
			array_push($stuff, $event_name,$event_desc, $start_time, $end_time);
		}
	}
}
else
{
	$response = "No such student exists";
}

	//$result = mysqli_query($con,$sql);
	//$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
	//$count = mysqli_num_rows($result);
	for($i=0; $i<sizeof($stuff); $i++)
	{
		$sql = "SELECT event_name, event_desc, strat_time, end_time FROM event WHERE student_id = '$student_id'";
		$result = mysqli_query($con,$sql);
		$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
		$count = mysqli_num_rows($result);
		if($count > 0)
		{
			$event_name[$stuff[$i]] = $row['Eventname'];
		}
		else
		{
			$response = "Error in retrieving event";
		}

	}

	if(sizeof($event_name) > 0)
	{
		$response[0] = "Get event was Succes!";
		array_push($response, $event_name);
	}

	echo json_encode($response);
?>
