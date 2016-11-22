app.controller('MainController', MainController);

function MainController($scope, $anchorScroll, $location, $sce, MainService){

    init();
    function init(){
      console.log('ok 200');
      dataAPI();
      $scope.showBtn = function(name){
        $scope.type=name;
        $location.hash('game-wrap');
        $anchorScroll();
      };
      $scope.suf = function(){
        $scope.href = MainService.suf($scope.href);
      };
      $scope.overAPI = function(name, tagnum){
        $scope.over = null;
        $scope.overAjax=true;
        MainService.json('https://api.overwatchinfo.com/pc/kr/'+name+'-'+tagnum+'/profile').then(function(data){
          $scope.overAjax =false;
          
          data.data.total_wins = MainService.rep(data.data.total_wins,'games won','');
          data.data.quick_play.time_played = MainService.rep(data.data.quick_play.time_played,'hours', '시간');
          data.data.competitive_play.time_played = MainService.rep(data.data.competitive_play.time_played,'hour', '시간');
          
          data.data.quick_play.hero1 = MainService.repHeroName(data.data.quick_play.hero1);
          data.data.quick_play.hero2 = MainService.repHeroName(data.data.quick_play.hero2);
          data.data.quick_play.hero3 = MainService.repHeroName(data.data.quick_play.hero3);
          
          data.data.competitive_play.hero1 = MainService.repHeroName(data.data.competitive_play.hero1);
          data.data.competitive_play.hero2 = MainService.repHeroName(data.data.competitive_play.hero2);
          data.data.competitive_play.hero3 = MainService.repHeroName(data.data.competitive_play.hero3);
          
          $scope.over = data;
        });
      };
      $scope.showMusic = function(obj){
        if(obj.path == '') return;
        $scope.musicName =obj.name;
        $scope.musicPath = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+obj.path);
      };
    }
  
    function dataAPI(){
      MainService.json('model/main/data-api.php').then(function(data){
        
        data.href = MainService.suf(data.href);
        
        console.log(data);
        $scope.href =data.href;
        $scope.game =data.game;
        $scope.music=data.music;
      });
    }
}