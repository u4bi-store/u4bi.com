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