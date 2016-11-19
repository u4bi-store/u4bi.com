app.controller('MainController', MainController);

function MainController($scope, MainService){

    init();
    function init(){
      console.log('ok 200');
      testAPI();
    }
  
    function testAPI(){
      MainService.json('model/main/test-api.php').then(function(data){
        console.log(data.name);
        console.log(data.date);
        $scope.visit =data;
      });
    }
}