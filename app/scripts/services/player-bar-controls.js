angular.module("services")

    .factory("PlayerBarControls", ["$q", "$stateParams", "GetAlbum", "SongInfo", "PlayAlbum", function ($q, $stateParams, GetAlbum, SongInfo, PlayAlbum) {
        "use strict";

        var collection, volumeFill, volumeThumb, $j;
        collection = GetAlbum.collection;
        $j = jQuery.noConflict();

        return {
            currentAlbumData: function () {
                return collection.then(function (albums) {
                    var albumCollection, album;
                    albumCollection = albums.data;
                    album = albums.data[GetAlbum.getAlbumById(albumCollection, $stateParams.id)];
                    return album;
                });
            },
            playPause: function () {
                if (!SongInfo.currentSoundFile) {
                    PlayAlbum.setSong(1);
                    SongInfo.currentSoundFileDeferred.then(function (currentSoundFile) {
                        SongInfo.currentSoundFile = currentSoundFile;
                        SongInfo.currentSoundFile.play();
                        SongInfo.isPlaying = true;

                        volumeFill = $j(".volume .fill");
                        volumeThumb = $j(".volume .thumb");
                        volumeFill.width(SongInfo.currentVolume + '%');
                        volumeThumb.css({left: SongInfo.currentVolume + '%'});

                        PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).html(PlayAlbum.pauseButtonTemplate);
                        $j(PlayAlbum.playPauseButton).removeClass("ion-play").addClass("ion-pause");
                    });
                } else if (SongInfo.currentSoundFile.isPaused()) {
                    $j(PlayAlbum.getSongNumberButton).html(PlayAlbum.pauseButtonTemplate);
                    $j(PlayAlbum.playPauseButton).html(PlayAlbum.playPauseButton);
                    SongInfo.currentSoundFile.play();
                    SongInfo.isPlaying = true;
                } else if (SongInfo.currentSoundFile) {
                    $j(PlayAlbum.getSongNumberButton).html(PlayAlbum.playButtonTemplate);
                    $j(PlayAlbum.playPauseButton).removeClass("ion-pause").addClass("ion-play");
                    SongInfo.currentSoundFile.pause();
                    SongInfo.isPlaying = true;
                }
            },
            nextSong: function () {
                var startingNumber, nextIndex, PlayerBarControls;
                startingNumber = SongInfo.currentlyPlayingSongNumber;
                PlayerBarControls = this;

                PlayAlbum.albumData("songs", startingNumber).then(function (track) {
                    PlayerBarControls.currentAlbumData().then(function (album) {
                        SongInfo.currentAlbum = album;
                        SongInfo.currentSongFromAlbum = track;
                        nextIndex = SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) === (SongInfo.currentAlbum.songs.length - 1) ? 0 : (SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) + 1);

                        PlayAlbum.setSong(nextIndex + 1);
                        SongInfo.currentSoundFileDeferred.then(function (currentSoundFile) {
                            SongInfo.currentSoundFile = currentSoundFile;
                            SongInfo.currentSoundFile.play();
                            SongInfo.isPlaying = true;

                            PlayAlbum.playPauseButton.removeClass("ion-play").addClass("ion-pause");
                            PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).html(PlayAlbum.pauseButtonTemplate);
                            PlayAlbum.getSongNumberButton(startingNumber).html(startingNumber);
                        });
                    });
                });

            },
            previousSong: function () {
                var startingNumber, previousIndex, PlayerBarControls;
                startingNumber = SongInfo.currentlyPlayingSongNumber;
                PlayerBarControls = this;

                PlayAlbum.albumData("songs", startingNumber).then(function (track) {
                    PlayerBarControls.currentAlbumData().then(function (album) {
                        SongInfo.currentAlbum = album;
                        SongInfo.currentSongFromAlbum = track;
                        previousIndex = SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) === 0 ? (SongInfo.currentAlbum.songs.length - 1) : (SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) - 1);

                        PlayAlbum.setSong(previousIndex + 1);
                        SongInfo.currentSoundFileDeferred.then(function (currentSoundFile) {
                            SongInfo.currentSoundFile = currentSoundFile;
                            SongInfo.currentSoundFile.play();
                            SongInfo.isPlaying = true;

                            PlayAlbum.playPauseButton.removeClass("ion-play").addClass("ion-pause");
                            PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).html(PlayAlbum.pauseButtonTemplate);
                            PlayAlbum.getSongNumberButton(startingNumber).html(startingNumber);
                        });
                    });
                });
            },
            seek: function (time) {
                if (SongInfo.currentSoundFile) {
                    SongInfo.currentSoundFile.setTime(time);
                }
            },
            updateSeekPercentage: function (seekBar, seekBarFillRatio) {

                // summary:
                //      Updates the seek bar percentage based on where the thumb is inside the bar.
                // seekbar: jQuery node
                //      The seekbar to apply the css
                // seekbarFillRatio: Number
                //      Fill percentage of the seek bar. Provided by setupSeekBars func. (Below) & updateSeekBarWhileSongPlays func. (Above)
                // returns: String
                //      percentageString for fill and thumb classes (still needs fill ratio to complete percentage

                var offsetXPercent = seekBarFillRatio * 100;

                //Returns number between 0 and 100
                offsetXPercent = Math.max(0, offsetXPercent);
                offsetXPercent = Math.min(100, offsetXPercent);

                var percentageString = offsetXPercent + '%';
                $j(seekBar).find('.fill').width(percentageString);
                $j(seekBar).find('.thumb').css({left: percentageString});

            },
            clickSeekBarPosition: function ($event) {
                // summary:
                //      Determines fill ratio based on where you clicked
                // var OffsetX:
                //      Gets the distance from left edge of seek bar
                // var barWidth:
                //      Gets width of seek bar
                // returns: Number
                //      Ratio of seek bar offset X to width of bar

                var offsetX, barWidth, seekBarFillRatio;
                offsetX = $event.clientX - $j($event.target).offset().left;
                barWidth = $j($event.target).width();
                seekBarFillRatio = offsetX / barWidth;

                if ($j($event.target).parent().attr('class') === 'seek-control') {
                    this.seek(seekBarFillRatio * SongInfo.currentSoundFile.getDuration());
                } else {
                    PlayAlbum.setVolume(seekBarFillRatio * 100);
                }

                this.updateSeekPercentage($j($event.target), seekBarFillRatio);

            }

        };

    }]);