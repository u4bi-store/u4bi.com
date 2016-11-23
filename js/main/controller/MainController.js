app.controller('MainController', MainController);

function MainController($scope, $anchorScroll, $location, $sce, MainService){

    init();
    function init(){
      console.log('ok 200');
      dataAPI();
      $scope.borderType=0;
      $scope.borderPage=0;
      $scope.borderFlag=true;
      
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
      
      $scope.borderTurn = function(bool){
        var len = $scope.border.length-1;
        var now = $scope.borderType;
        
        if(bool && now == len || !bool && now == 0) return;
        
        if(bool) $scope.borderType++;
        else $scope.borderType--;
        borderAPI(0,$scope.borderType);
        if(!$scope.borderFlag)$scope.borderFlag=true;
      };
      $scope.borderReload = function(){
        borderAPI(0,$scope.borderType);
        if(!$scope.borderFlag)$scope.borderFlag=true;        
      };
      $scope.showList = function(viewnum){
        borderAPI(0,viewnum);
        if(!$scope.borderFlag)$scope.borderFlag=true;
      };
      $scope.showDetail = function(keynum,viewnum){
        if(keynum == -1|| keynum == $scope.listLen) return;
        borderAPI(1, keynum, viewnum-1);
        if($scope.borderFlag)$scope.borderFlag=false;
      };
    }
  
    function dataAPI(){
      MainService.json('model/main/data-api.php').then(function(data){
        
        data.href = MainService.suf(data.href);
        
        console.log(data);
        $scope.href =data.href;
        $scope.game =data.game;
        $scope.music=data.music;
        $scope.border=data.border;
      });
    }
  
    function borderAPI(type, keynum, viewnum){

      var path=['model/border/list-api.php/?','model/border/detail-api.php/?'];

      MainService.json(path[type]+'keynum='+keynum+'&viewnum='+viewnum).then(function(data){
        if(type==0){
          $scope.detail=null;
          $scope.list = null;
          $scope.list = data.list;
          $scope.listLen = data.list.length;
        } else{
          data.detail[0].key = parseInt(data.detail[0].key); 
          $scope.detail = data.detail;
        }
      });
    };
}