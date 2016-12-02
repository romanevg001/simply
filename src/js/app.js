
(function(){

    var app = angular.module('simply', [
       'ngResource',
       'ui.router',
       'ngSanitize',
       'ui.bootstrap'
    ]);


    app.constant('api', {
        url: config.url
    });

  

    app.config(function ($stateProvider, $urlRouterProvider) {

  //      $locationProvider.html5Mode(false).hashPrefix('!');

    //    $urlMatcherFactoryProvider.strictMode(false);
        
       
        $stateProvider
            .state('home', {
                url: "",
                templateUrl: "templates/login.html",
                controller: 'loginCtr'
            })
            .state('rooms', {
                abstract: true,
                templateUrl: "/templates/rooms.html",
                controller: 'roomsCtr'
            })
            .state('rooms.chat', {
                url: "/rooms",
                templateUrl: "templates/chat.html",
                controller: 'chatCtr'
            })
            .state('rooms.edit', {
                url: "/roomsedit",
                templateUrl: "templates/roomsedit.html",
                controller: 'roomseditCtr'
            })
            
    })



    // i8App.config(['$httpProvider', '$urlMatcherFactoryProvider', function ($httpProvider, $urlMatcherFactoryProvider) {
    //     $httpProvider.defaults.withCredentials = true;
    //     $httpProvider.defaults.useXDomain = true;
    //     $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    //     $httpProvider.defaults.headers.common['Content-type'] = 'application/json';
    //     $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    //     $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    //     $httpProvider.interceptors.push('sessionRecoverer');
    // }]);
   


window.app = app;
})();
