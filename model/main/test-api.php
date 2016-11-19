<?php
//require_once("./lib/dbcon.php");

$now = date("Y-m-d H:i:s");

$dataArray = array("name" => "u4bi", "date" => $now);
echo json_encode($dataArray);
?>