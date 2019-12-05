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
$event_name = stripslashes($event_name);
$event_desc = stripslashes($event_desc);
$start_time = stripslashes($start_time);
$end_time = stripslashes($end_time);
$sql = "SELECT event_name, event_desc, start_time, end_time FROM event WHERE student_id = '200100'";
$result = mysqli_query($con,$sql);
//Instead of $stuff, this is the array that saves the list of events
$eventList = [];
//This will search the entire Table of 'event' and push each row of content into evenList
//Each element of $eventList[0,1,2...] will contain the sql query entry with respect to the table column name (event_name, start_time, etc)
while($row = mysqli_fetch_array($result,MYSQLI_ASSOC))
{
	array_push($eventList, $row);

}
for($i=0; $i<sizeof($eventList); $i++){
	$time= strtotime($eventList[$i]["start_time"]);
	$start_time= date("m/d/Y h:i A", $time);
	$eventList[$i]["start_time"]= $start_time;

	$etime= strtotime($eventList[$i]["end_time"]);
	$end_time= date("m/d/Y h:i A", $etime);
	$eventList[$i]["end_time"]= $end_time;
}

$response = [];
if(sizeof($eventList) > 0)
{
	//print_r($eventList);
	$response[0] = "Get event was Success!";
	//$response[1] = $eventList
	//$eventList[0] = Array ( [event_name] => Final Exam [event_desc] => Computer science final exam! Need to study! [start_time] => 2019-11-21 10:00:00 [end_time] => 2019-11-21 12:00:00 )
	//Can now call by key, for example: $eventList[0]['event_name'] => 'Final Exam'.
	array_push($response, $eventList);
}
else
{
	$response[0] = "No such student exists <br>".$con->error;
}

echo json_encode($response);
?>
