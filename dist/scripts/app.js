var blocJams = angular.module("blocJams", ["ui.router", "services"]);

blocJams.config(function($stateProvider, $locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $stateProvider
        .state('landing', {
            url: '/',
            templateUrl: '../templates/landing.html',
            controller: 'LandingController'
        })
        .state('collection', {
            url: '/collection',
            controller: 'CollectionController',
            templateUrl: '../templates/collection.html'
        })
        .state('album', {
            url: '/album/:albumId',
            controller: 'AlbumController',
            templateUrl: '../templates/album.html'
        });
});


