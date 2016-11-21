app.controller('MainController', MainController);

function MainController($scope, $anchorScroll, $location, MainService){

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
          
          console.log(JSON.stringify(data));
          $scope.over = data;
        });
      };
    }
  
    function dataAPI(){
      MainService.json('model/main/data-api.php').then(function(data){
        
        data.href = MainService.suf(data.href);
        
        console.log(data);
        $scope.href =data.href;
        $scope.game =data.game;
      });
    }
}