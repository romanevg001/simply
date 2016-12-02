app.service("apiRooms", ['$http', 'api', function($http, api){
    return {
        getRoomsList: function(){                            
            return $http({
                method: 'GET',
                url: api.url + '/data/roomsList.json',
                cache: false             
            })
        },
        updateRoomsList: function(){                            
            return $http({
                method: 'GET',//POST
                url: api.url + '/data/roomsList.json',
                cache: false             
            })
        },
        delRoomsList: function(){                            
            return $http({
                method: 'GET',//DELETE
                url: api.url + '/data/roomsList.json',
                cache: false             
            })
        },

        getCurrentRoom: function(_d){
            return $http({
                method: 'GET',
                url: api.url + '/data/'+_d+'.json',
                cache: false
            })
        },
        saveMessage: function(){
            return $http({
                method: 'GET',
                url: api.url + '/data/rooms.json',
                cache: false
            })
        }
    }
}]);  