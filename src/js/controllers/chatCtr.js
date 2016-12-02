angular.module('simply')
.controller('chatCtr',['$scope','$http', 'apiRooms', 'apiUsers', function($scope, $http, apiRooms, apiUsers){

   $scope.currentRoom = {};
       $scope.currentUser =  (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : undefined;

   

    apiRooms.getRoomsList()
    .then(function(res){
        $scope.roomsMenu = res.data.rooms;
    },function(err){
        $scope.errors = err ? err : [{text:"Проверьте соединение"}]
    })

    $scope.onTabSelect = function(roomId){
       apiRooms.getCurrentRoom(roomId).then(function(res){
            $scope.currentRoom = res.data;
        },function(err){
            $scope.errors = err ? err : [{text:"Проверьте соединение"}]
        })
    }
    $scope.onTabSelect('getCommonRoom');

    $scope.addMessage = function(){
        var message = {
            date: new Date(),
            text: $scope.message,
            author: "Lisa",
            isAdmin: ($scope.currentUser.name == 'admin') ? true : false
            
        }
        $scope.currentRoom.messages.push(message)
        apiRooms.saveMessage(message);
        $scope.message = '';

    }
}])