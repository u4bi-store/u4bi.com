app.controller('MainController', MainController);

function MainController($scope, $anchorScroll, $location, $sce, MainService){

    init();
    function init(){
      $scope.name ='NECOP';
      $scope.tagnum = '3112';
      $scope.type = 'music';
      
      console.log('ok 200');
      dataAPI();
      $scope.borderType=0;
      $scope.borderPage=1;
      $scope.borderFlag=true;
      $scope.minigameType='js-pingpong';
      $scope.showBtn = function(name){
        if(name == 'teach') return window.open('https://www.inflearn.com/course/github-%EA%B8%B0%EB%B3%B8%EA%B8%B0-10%EB%B6%84/', '_blank');
        $scope.type=name;
        $location.hash('');
        $anchorScroll();
      };
      $scope.showMinigame = function(name){
        if(name == '') return;
        $scope.minigameType=name;
        $location.hash('');
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
          data.data.competitive_play.time_played = MainService.rep(data.data.competitive_play.time_played,'hours', '시간');
          
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
        
        $scope.borderPage=1;
        $scope.currentPage=1;
        borderAPI(0,$scope.borderType,$scope.borderPage);
        if(!$scope.borderFlag)$scope.borderFlag=true;
      };
      $scope.borderReload = function(){
        borderAPI(0, $scope.borderType, $scope.currentPage);
        if(!$scope.borderFlag)$scope.borderFlag=true;        
      };
      $scope.showList = function(viewnum, prev){
        if(viewnum == 0|| viewnum >= $scope.listLen) return
        $scope.currentPage = viewnum;
        if(prev) $scope.borderPage = viewnum-1;
        else if(viewnum%2 != 0) $scope.borderPage = viewnum;
        
        borderAPI(0, $scope.borderType, viewnum);
        if(!$scope.borderFlag)$scope.borderFlag=true;
      };
      
      $scope.showDetail = function(keynum,viewnum){
        if(keynum == -1|| keynum == $scope.list.length) return;
        borderAPI(1, keynum, viewnum);
        if($scope.borderFlag)$scope.borderFlag=false;
      };
    }
  
    function dataAPI(){
      MainService.json('model/main/data-api.php').then(function(data){
        
        data.href = MainService.suf(data.href);
        
        console.log(data);
        $scope.href =data.href;
        $scope.game =data.game;
        $scope.minigame = data.minigame;
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
          $scope.listLen = data.len;
        } else{
          data.detail[0].key = parseInt(data.detail[0].key); 
          $scope.detail = data.detail;
        }
      });
    };
}