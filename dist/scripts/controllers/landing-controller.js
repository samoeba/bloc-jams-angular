//noinspection JSLint
var $j = jQuery.noConflict();

angular.module('blocJams')

.controller('LandingController', ['$scope', function ($scope) {
    "use strict";

    $scope.tagLine = 'Turn the music up!';

    $j(function () {
        console.log("checkpoint");
        var pointsArray = $j('.point');

        var animatePoints = function() {

            var revealPoint = function() {
                $j(this).css({
                    opacity: 1,
                    transform: 'scaleX(1) translateY(0)'
                });
            };
            $j.each($j('.point'), revealPoint);
        };

        $j(window).load(function () {

            if ($j(window).height() > 1200) {
                animatePoints();
            }

            $j(window).scroll(function() {

                //console.log("Current offset from the top is " + pointsArray[0].getBoundingClientRect().top + " pixels");
                //console.log("Window from the top is " + $(window).scrollTop());
                if ($j(window).scrollTop() >= 100) {
                    animatePoints();
                }

            });
        });
    });
}]);