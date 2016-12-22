<?php
//require_once("./lib/dbcon.php");

$keynum = $_GET["keynum"];
$viewnum = $_GET["viewnum"];

$data_array = array('list'=> array(), 'len'=>null);

$size = 80;
$typeName = ['자유자유','정보정보','생활생활','메모메모'];

for($i=1; $i<$size; $i++){
  $low =$i-1;
  if($low < 40) $temp = 0;
  else if($low < 50) $temp = 1;
  else if($low < 70) $temp = 2;
  else if($low < 80) $temp = 3;
  
  $send = $typeName[$temp].' 좋은글'.$low.'좋은글';
  $list[$low] = [$low, $temp, $send,'길동이',3,'2016/12/23/23:23'];
}

$limit = 10;
$first = ($viewnum-1)*$limit;
$last = $viewnum*$limit;
$tick = 0;
foreach ($list as $x){
  if($x[1] == $keynum){
    if($first <= $tick && $tick < $last){
      $data = array(
        "id" => $x[0],
        "type" => $x[1],
        "title" => $x[2],
        "writer" => $x[3],
        "hit" => $x[4],
        "date" => $x[5]
      );
      array_push($data_array['list'], $data);
    }
    $tick++;
  }
}
$data_array['len'] = ($tick/$limit)+1;

echo json_encode($data_array,JSON_UNESCAPED_UNICODE);
?>