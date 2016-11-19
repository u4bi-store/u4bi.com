app.controller('MainController', MainController);

function MainController($scope, MainService){

    init();
    function init(){
      console.log('ok 200');
      hrefAPI();
    }
  
    function hrefAPI(){
      MainService.json('model/main/href-api.php').then(function(data){
        console.log(data);
        $scope.href =data;
      });
    }
}