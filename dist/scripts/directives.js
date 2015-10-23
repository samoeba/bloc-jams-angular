var jamsDirectives = angular.module("directives", ["services"]);

//noinspection JSLint
var $j = jQuery.noConflict();

    jamsDirectives.directive("pbSeekbar", function(SongInfo, PlayerBarControls, PlayAlbum) {

        return {
            scope: true,
            replace: true,
            templateUrl: "/templates/seekbars.html",
            restrict: "E",
            link: function (scope) {
                scope.clickSeekBarPosition = function ($event) {
                    PlayerBarControls.clickSeekBarPosition($event);
                };

                scope.dragSeekBarPosition = function ($event) {
                    // start using jQuery
                    var $seekBars, updateSeekPercentage;
                    $seekBars = $j('.player-bar .seek-bar');
                    updateSeekPercentage = function (seekbar, seekbarFillRatio) {
                        PlayerBarControls.updateSeekPercentage(seekbar, seekbarFillRatio);
                    };


                    $seekBars.find('.thumb').mousedown(function (event) {
                        // summary:
                        //      Finds thumb class and assigns mousedown event to it, making it move with users cursor
                        // mousemove event:
                        //      Binds mousemove to thumb so that where ever the cursor moves so does the thumb while also updating fill of seekbar
                        // mouseup event:
                        //      Unbinds mousemove and mouseup events

                        var $seekBar = $j(this).parent();

                        $j(document).bind('mousemove.thumb', function (event) {
                            var offsetX = event.pageX - $seekBar.offset().left;
                            var barWidth = $seekBar.width();
                            var seekBarFillRatio = offsetX / barWidth;

                            if ($j(this).parent().attr('info') === "time") {
                                PlayerBarControls.seek(seekBarFillRatio * SongInfo.currentSoundFile.getDuration());
                            } else {
                                PlayAlbum.setVolume(seekBarFillRatio * 100);
                            }

                            updateSeekPercentage($seekBar, seekBarFillRatio);
                        });

                        $j(document).bind("mouseup.thumb", function () {
                            $j(document).unbind("mousemove.thumb");
                            $j(document).unbind("mouseup.thumb");
                        });

                    });

                };
            }
        };
    });