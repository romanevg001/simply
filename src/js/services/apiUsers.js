app.service("apiUsers", ['$http', 'api', function($http, api){
    return {
        login: function(_d){                            
            return $http({
                method: 'GET',
                url: api.url + '/data/'+_d.name+'.json',
                cache: false             
            })
        },
        logout: function(_d){                            
            return $http({
                method: 'GET',
                url: api.url + '/data/'+_d.name+'.json',
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