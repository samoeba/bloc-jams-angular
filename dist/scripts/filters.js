var jamsFilters = angular.module("filterss", []);

    //noinspection JSLint
    var $j = jQuery.noConflict();

    jamsFilters.filter('songTime', function(){
        return function songTime(input){
            var minutes, seconds;
            minutes = Math.floor(input / 60);
            seconds = Math.floor(input % 60);
            if(seconds < 10){
                input = minutes + ":0" + seconds;
            } else {
                input = minutes + ":" + seconds;
            }
            if ( isNaN(seconds) === false){
                return input;
            }
        };
    });