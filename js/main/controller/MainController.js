app.controller('MainController', MainController);

function MainController($scope, MainService){

    init();
    function init(){
      console.log('ok 200');
      hrefAPI();
      $scope.showBtn = function(name){
        $scope.type=name; 
      };
    }
  
    function hrefAPI(){
      MainService.json('model/main/href-api.php').then(function(data){
        
        var len = data.length, ran, tempArr;
        while(0 !== len){
          
          ran = Math.floor(Math.random() * len);
          len -= 1;
          tempArr = data[len];
          
          data[len] = data[ran];
          data[ran] = tempArr;
        }
        
        console.log(data);
        $scope.href =data;
      });
    }
}