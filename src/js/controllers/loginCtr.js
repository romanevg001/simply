app.controller('loginCtr',['$scope','$http', 'apiUsers', '$state', function($scope, $http, apiUsers, $state){



   $scope.login = function(){
        apiUsers.login($scope.user).then(function(res){
            localStorage.setItem('user',JSON.stringify(res.data));
            $state.go('rooms.chat');

        },function(err){
            $scope.errors = err ? err : [{text:"Проверьте соединение"}]
        })
   }
}])