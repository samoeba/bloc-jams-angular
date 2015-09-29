var blocJams = angular.module('blocJams', ['ui.router']);

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
        .state('album', {
            url: '/album',
            controller: 'AlbumController2',
            templateUrl: '../templates/album.html'
        })
        .state('collection', {
            url: '/collection',
            controller: 'CollectionController',
            templateUrl: '../templates/collection.html'
        });
});


