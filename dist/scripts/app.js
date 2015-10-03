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
        .state('collection', {
            url: '/collection',
            controller: 'CollectionController',
            templateUrl: '../templates/collection.html'
        })
        .state('album', {
            url: '/album',
            controller: 'AlbumController',
            templateUrl: '../templates/album.html'
        });
        //.state('album.picasso', {
        //    url: '/album/:albumIndex',
        //    templateUrl: '../templates/albums/picassoColors.html',
        //    controller: 'AlbumController'
        //});
});


