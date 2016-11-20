<?php
//require_once("./lib/dbcon.php");

$data_array = array();

$temp = [
  ['깃저장소','http://github.com/u4bi'],
  ['티스토리','http://web.u4bi.com'],
  ['페이스북','http://www.facebook.com/ymjcode'],
  ['깃페이지','http://u4bi.github.io'],
  ['로켓펀치','http://www.rocketpunch.com/@myungJ2EE'],
  ['링크드인','http://www.linkedin.com/in/myungj2ee'],
  ['유튜브','http://www.youtube.com/channel/UCg9KB52VF-B5MHFfBLAxmRA'],
  ['웹프로필','http://u4bi.com']
];
foreach ($temp as $x){
    $data = array( "name" => $x[0], "path" => $x[1]);
    array_push($data_array, $data);
}
echo json_encode($data_array,JSON_UNESCAPED_UNICODE);
?>