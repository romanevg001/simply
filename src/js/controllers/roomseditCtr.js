app.controller('roomseditCtr',['$scope', 'apiRooms', '$state', function($scope, apiRooms, $state){
    
    $scope.currentUser =  (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : '';
    if($scope.currentUser.name != 'admin'){$state.go('home');}

   apiRooms.getRoomsList()
    .then(function(res){
        $scope.roomsList = res.data.rooms;
    },function(err){
        $scope.errors = err ? err : [{text:"Проверьте соединение"}]
    })


    $scope.edit = function(room){
        if(room.name != ''){
            room.editing = false;

            apiRooms.updateRoomsList($scope.roomsList)
            .then(function(res){
              //  $scope.roomsList = res.data.rooms;
                
            },function(err){
                $scope.errors = err ? err : [{text:"Проверьте соединение"}]
            })
        }
    }
    $scope.del = function(room){
       
        $scope.roomsList.splice(_.findIndex($scope.roomsList, function(o) { return o.id == room.id; }),1);


            apiRooms.delRoomsList(room)
            .then(function(res){
              //  $scope.roomsList = res.data.rooms;
                
            },function(err){
                $scope.errors = err ? err : [{text:"Проверьте соединение"}]
            })
    }

    $scope.add = function(room){
        if($scope.newroom != ''){

            $scope.roomsList.push({
                name: $scope.newroom,
                id: $scope.newroom.split(" ").join("").toLowerCase()
            });
            $scope.newroom = '';
            $scope.adding = false;

            apiRooms.updateRoomsList($scope.newroom)
            .then(function(res){
              //  $scope.roomsList = res.data.rooms;
                
            },function(err){
                $scope.errors = err ? err : [{text:"Проверьте соединение"}]
            })
        }
    }
    
    
    
}])