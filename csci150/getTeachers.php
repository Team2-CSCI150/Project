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
$studentID;
if(isset($data)) {
	$request=json_decode($data,true);
	$studentID=$request["studentID"];
}

$studentID = mysqli_real_escape_string($con,$studentID);
$studentID = stripslashes($studentID);

$sql = "SELECT Class1ID,Class2ID,Class3ID,Class4ID FROM students WHERE StudentID = '200100'";

$result = mysqli_query($con,$sql);
$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
$count = mysqli_num_rows($result);

$classToTeacher = [];
$response = [];
if($count > 0)
{
	foreach($row as $classID)
	{
		//echo $classID.": ";
		$sql = "SELECT ClassInstructor FROM classlist WHERE ClassID = '$classID'";
		$classResult = mysqli_query($con,$sql);
		$rows = mysqli_fetch_array($classResult,MYSQLI_ASSOC);
		$classCount = mysqli_num_rows($classResult);
		if($classCount > 0)
		{
			$temp = ['classID' => $classID,
					'teacher' => $rows['ClassInstructor']
			];
			array_push($classToTeacher, $temp);
		}
	}
}
else
{
	$response[0] = "Invalid Student";
}
if(sizeof($classToTeacher)>0)
{
	$response[0] = "Teachers List from Student Success!";
	array_push($response, $classToTeacher);
}
else
{
	array_push($response, "No Teachers Available");
}

echo json_encode($response);
?>