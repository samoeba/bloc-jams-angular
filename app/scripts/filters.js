var jamsFilters = angular.module("directives", []);

    //noinspection JSLint
    var $j = jQuery.noConflict();

    jamsFilters.filter("pbSeekbar", function () {

        return function(input, lastIndex) {

            if (typeof input == "string" && typeof lastIndex == "number") {
                return input.substring(0, lastIndex) + "...";
            } else {
                return input;
            }







            var setCurrentTimeInPlayerBar = function(currentTime) {
                var curTime = $('.current-time').html(filterTimeCode(currentTime));
            };

            var setTotalTimeInPlayerBar = function() {
                var totTime = $('.total-time').html(filterTimeCode(currentSongDuration));
            };

            var filterTimeCode = function(timeInSeconds) {
                var time = parseFloat(timeInSeconds);
                var wholeMinutes = Math.floor(time/60);
                var wholeSeconds = Math.floor(time % 60);
                if (wholeSeconds >= 10) {
                    var formatTime = wholeMinutes + ":" + wholeSeconds;
                } else {
                    var formatTime = wholeMinutes + ":0" + wholeSeconds;
                }

                return formatTime;
            };





        };

    });

    jamsFilters.filter("pbSeekbar", function () {

    });
