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
            controller: 'AlbumController',
            templateUrl: '../templates/album.html'
        })
        .state('collection', {
            url: '/collection',
            controller: 'CollectionController as collectionCtrl',
            templateUrl: '../templates/collection.html'
        });
});

blocJams.controller('LandingController', ['$scope', function ($scope) {
    $scope.tagLine = 'Turn the music up!';

    $(function () {
        var pointsArray = $('.point');

        var animatePoints = function () {

            var revealPoint = function () {
                $(this).css({
                    opacity: 1,
                    transform: 'scaleX(1) translateY(0)'
                });
            };
            $.each($('.point'), revealPoint);
        };

        $(window).load(function () {

            if ($(window).height() > 1200) {
                animatePoints();
            }

            $(window).scroll(function (event) {

                //console.log("Current offset from the top is " + pointsArray[0].getBoundingClientRect().top + " pixels");
                if ($(window).scrollTop() >= 100) {
                    animatePoints();
                }

            });

        });
    });
}]);