<?php
//require_once("./lib/dbcon.php");

$data_array = array('href'=> array() , 'game'=> array() , 'music'=> array(), 'border'=> array());

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
  ['만남의광장','null'],
  ['오버워치 전적','over'],
  ['코딩용 음악','music'],
  ['미니게임','game'],
  ['운명의 주사위','dice'],
  ['홀짝 사다리','radder'],
  ['FPS샷감 연습','shot'],
  ['지하철매니저','subway']
];

$music = [
  ['편안한','_Ps8U_lhjPg?autoplay=1'],
  ['고요한','A81R-3lvYP8?autoplay=1'],
  ['잔잔한',''],
  ['신나는',''],
  ['열정적',''],
  ['즐거운',''],
  ['신비의',''],
  ['탐험적',''],
  ['모험적',''],
  ['재빠른',''],
  ['급박한',''],
  ['전투적',''],
  ['씁쓸한',''],
  ['우울한',''],
  ['화가난',''],
  ['클럽가는',''],
  ['힙클가는',''],
  ['베이퍼한','l6GktA3RYtw?list=RDl6GktA3RYtw&autoplay=1']
];

$border = [
  ['자유게시판','free'],
  ['정보게시판','data'],
  ['생활게시판','life'],
  ['메모게시판','memo']
];

foreach ($href as $x){
    $data = array( "name" => $x[0], "path" => $x[1]);
    array_push($data_array['href'], $data);
}

foreach ($game as $x){
    $data = array( "name" => $x[0], "path" => $x[1]);
    array_push($data_array['game'], $data);
}

foreach ($music as $x){
    $data = array( "name" => $x[0], "path" => $x[1]);
    array_push($data_array['music'], $data);
}

foreach ($border as $x){
    $data = array( "name" => $x[0], "path" => $x[1]);
    array_push($data_array['border'], $data);
}

echo json_encode($data_array,JSON_UNESCAPED_UNICODE);
?>