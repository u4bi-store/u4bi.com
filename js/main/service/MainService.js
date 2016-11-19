app.factory('MainService', MainService);

function MainService($http, $q){
    return {
        'json' : json
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
}