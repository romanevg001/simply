app.controller('roomsCtr',['$scope', 'apiUsers', '$state', function($scope, apiUsers, $state){
    
    $scope.currentUser =  (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : '';
    
    $scope.logout = function(){
        apiUsers.logout($scope.currentUser).then(function(res){
            localStorage.setItem('user','');
            // $state.go('home');

        },function(err){
            $scope.errors = err ? err : [{text:"Проверьте соединение"}]
        })
    }
    
}])