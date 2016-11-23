<?php
//require_once("./lib/dbcon.php");

$data_array = array('list'=> array());

$list = [
  [1,0,'재밌는 게시물','길동이',3,'2016/12/23/23:23'],
  [2,0,'으아아아오','길동이',3,'2016/12/23/23:23'],
  [3,0,'우키키키','길동이',3,'2016/12/23/23:23'],
  [4,0,'하카카카카','길동이',3,'2016/12/23/23:23'],
  [5,0,'하카카카카','길동이',3,'2016/12/23/23:23']
];

foreach ($list as $x){
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

echo json_encode($data_array,JSON_UNESCAPED_UNICODE);
?>