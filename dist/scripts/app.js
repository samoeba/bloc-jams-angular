var blocJams = angular.module('blocJams', ['ui.router']);
var tests = { size: "big", price: 20 };

blocJams.config(function($stateProvider, $locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $stateProvider
        .state('landing', {
            url: '/',
            template: '<section class="hero-content"><h1 class="hero-title">Turn the music up!</h1></section><section class="selling-points container"><div class="point column third"><span class="ion-music-note"></span><h5 class="point-title">Choose your music</h5><p class="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p></div><div class="point column third"><span class="ion-radio-waves"></span><h5 class="point-title">Unlimited, streaming, ad-free</h5><p class="point-description">No arbitrary limits. No distractions.</p></div><div class="point column third"> <span class="ion-iphone"></span> <h5 class="point-title">Mobile enabled</h5> <p class="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p> </div> </section> <div class="clearfix"></div> <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script> <script src="scripts/landing.js"></script>'
            //controller: 'Landing.controller',
            //templateUrl: '../templates/album.html'
        })
        .state('album', {
            url: '/album',
            controller: 'Album.controller',
            templateUrl: '../templates/album.html'
        })
        .state('collection', {
            url: '/collection',
            controller: 'Collection.controller',
            templateUrl: '../templates/collection.html'
        })
        .state('test', {
            url: '/test',
            template: '<h1>Test</h1>'
        });
});

blocJams.controller('TestController', function() {
    this.product = tests;
});

blocJams.controller('LandingController', function () {

});