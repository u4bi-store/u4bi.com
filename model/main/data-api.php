<?php
//require_once("./lib/dbcon.php");

$data_array = array('href'=> array() , 'game'=> array());

$href = [
  ['깃저장소','http://github.com/u4bi'],
  ['티스토리','http://web.u4bi.com'],
  ['페이스북','http://www.facebook.com/ymjcode'],
  ['깃페이지','http://u4bi.github.io'],
  ['로켓펀치','http://www.rocketpunch.com/@myungJ2EE'],
  ['링크드인','http://www.linkedin.com/in/myungj2ee'],
  ['유튜브','http://www.youtube.com/channel/UCg9KB52VF-B5MHFfBLAxmRA'],
  ['웹프로필','http://u4bi.com']
];

$game = [
  ['게임 순위보기','rank'],
  ['오버워치 전적','over'],
  ['코딩용 음악','music'],
  ['오늘 뭐먹지','food'],
  ['운명의 주사위','dice'],
  ['홀짝 사다리','radder'],
  ['샷감 연습','shot']
];

foreach ($href as $x){
    $data = array( "name" => $x[0], "path" => $x[1]);
    array_push($data_array['href'], $data);
}

foreach ($game as $x){
    $data = array( "name" => $x[0], "path" => $x[1]);
    array_push($data_array['game'], $data);
}

echo json_encode($data_array,JSON_UNESCAPED_UNICODE);
?>