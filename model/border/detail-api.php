<?php
//require_once("./lib/dbcon.php");

$keynum = $_GET["keynum"];
$viewnum = $_GET["viewnum"];

$data_array = array('detail'=> array());

$size = 80;
for($i=1; $i<$size; $i++){
  $low =$i-1;
  $detail[$low] = [$low, $low.'번 게시물 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용'];
}

$data = array("key" => $keynum, "id" => $detail[$viewnum][0], "content" => $detail[$viewnum][1],);
array_push($data_array['detail'], $data);

echo json_encode($data_array,JSON_UNESCAPED_UNICODE);
?>