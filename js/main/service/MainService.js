app.factory('MainService', MainService);

function MainService($http, $q){
    return {
        'json' : json,
        'suf' : suf
    };
    function json(path){
        var q =$q.defer();
        $http.get(path).success(function(data){
            q.resolve(data);
        }).error(function(err){
            q.reject(err);
        });
        return q.promise;
    }
    function suf(arr){
      var len = arr.length, ran, tempArr;
        while(0 !== len){
          
          ran = Math.floor(Math.random() * len);
          len -= 1;
          tempArr = arr[len];
          
          arr[len] = arr[ran];
          arr[ran] = tempArr;
        }
      return arr;
    }
}