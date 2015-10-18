var jamsServices = angular.module("services", [])


    .factory("GetAlbum", ["$http", function ($http) {
        "use strict";

        var albumsService = this, i;

        albumsService.collection = $http.get("/data/albums.json");

        return {

            collection: albumsService.collection,
            getAlbumById: function (data, value) {
                for (i = 0; i < data.length; i++) {
                    if (data[i].aid == value) {
                        return i;
                    }
                }
            }
        };

    }])

    .factory("SongInfo", ["GetAlbum", function (GetAlbum) {
        "use strict";

        var collection = GetAlbum.collection;

        return {
            //currentAlbum: function () {
            //    collection.then(function (albums) {
            //        var albumCollection, album;
            //        albumCollection = albums.data;
            //        album = albums.data[GetAlbum.getAlbumById(albumCollection, $stateParams.id)];
            //        return album;
            //    });
            //},
            currentAlbum: null,
            currentlyPlayingSongNumber: null,
            currentSongFromAlbum: null,
            isPlaying: false,
            currentSoundFile: null,
            //currentSongDurations: [],
            //currentSongDuration: null,
            currentVolume: 80
        };
    }])

    .factory("PlayAlbum", ["$stateParams", "GetAlbum", "SongInfo", function ($stateParams, GetAlbum, SongInfo) {
        "use strict";

        var collection, $j, trackButton, songNumber, volumeFill, volumeThumb, PlayAlbum;
        collection = GetAlbum.collection;
        $j = jQuery.noConflict();
        PlayAlbum = this;

        collection.then(function (albums) {
            var albumCollection, album;
            albumCollection = albums.data;
            album = albums.data[GetAlbum.getAlbumById(albumCollection, $stateParams.id)];
            console.log(album);
        });

        return {
            albumData: function (info, num) {
                collection.then(function (albums) {
                    var albumCollection, album;
                    albumCollection = albums.data;
                    album = albums.data[GetAlbum.getAlbumById(albumCollection, $stateParams.id)];
                    console.log(album[info][num - 1]);
                    return album[info][num - 1];
                });
            },
            playButtonTemplate: "<i class='ion-play'></i>",
            pauseButtonTemplate: "<i class='ion-play'></i>",
            setVolume: function(volume) {
                if (SongInfo.currentSoundFile) {
                    SongInfo.currentSoundFile.setVolume(volume);
                }
            },
            setSong: function (number) {
                if (SongInfo.currentSoundFile) {
                    SongInfo.currentSoundFile.stop();
                }
                SongInfo.currentlyPlayingSongNumber = parseInt(number);
                SongInfo.currentSongFromAlbum = this.albumData("songs", number);
                //SongInfo.currentSongFromAlbum = function () {
                //    collection.then(function (albums) {
                //        return PlayAlbum.albumData("songs", number);
                //        //var albumCollection, album;
                //        //albumCollection = albums.data;
                //        //album = albums.data[GetAlbum.getAlbumById(albumCollection, $stateParams.id)];
                //        //console.log("currentSongFromAlbum");
                //        //return album.songs[number - 1];
                //    });
                //};
                console.log(SongInfo.currentSongFromAlbum);
                SongInfo.currentSoundFile = new buzz.sound(SongInfo.currentSongFromAlbum.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
                //SongInfo.currentSoundFile = new buzz.sound(function () {
                //    collection.then(function (albums) {
                //        var albumCollection, album;
                //        albumCollection = albums.data;
                //        album = albums.data[GetAlbum.getAlbumById(albumCollection, $stateParams.id)];
                //        console.log("currentSoundFile");
                //        return SongInfo.currentSongFromAlbum.audioUrl;
                //    });
                //}, {
                //    formats: ['mp3'],
                //    preload: true
                //});
                this.setVolume(SongInfo.currentVolume);
            },
            playPauseButton: $j(".left-controls .play-pause span"),
            getSongNumberButton: function(number) {
                // Summary:
                //      Gets the song item whose data number matches that of the passed in argument (starts at 1)
                return $j('div[data-song-number="' + number + '"]');
            },
            playPauseSong: function($event) {
                console.log("I'm Clicked!");
                trackButton = $event.target;
                songNumber = parseInt(event.target.getAttribute('data-song-number'));
                console.log(songNumber);

                if (SongInfo.currentlyPlayingSongNumber !== null) {
                    $j(trackButton).html(SongInfo.currentlyPlayingSongNumber);
                }
                if (SongInfo.currentlyPlayingSongNumber !== songNumber) {
                    // If:
                    //      the currently playing song number is not equal to songNumber (the HTML data number of song item acted upon
                    //      via event) then assign that acted upon song with a pause button (signifies playing)
                    // setSong:
                    //      Changes the currently playing song number and current sound file (among other things) to the clicked song in the list

                    $j(trackButton).html(this.pauseButtonTemplate);
                    this.setSong(songNumber);
                    SongInfo.currentSoundFile.play();
                    SongInfo.isPlaying = true;

                    volumeFill = $j(".volume .fill");
                    volumeThumb = $j(".volume .thumb");
                    volumeFill.width(SongInfo.currentVolume + '%');
                    volumeThumb.css({left: SongInfo.currentVolume + '%'});

                    this.playPauseButton.removeClass("ion-play").addClass("ion-pause");
                }

                //If the currentlyPlayingSongNumber is equal to the song row we just clicked then it will either pause or play it
                else if (SongInfo.currentlyPlayingSongNumber === songNumber) {
                    if (SongInfo.currentSoundFile.isPaused()) {
                        $j(trackButton).html(this.pauseButtonTemplate);
                        this.playPauseButton.removeClass("ion-play").addClass("ion-pause");
                        SongInfo.currentSoundFile.play();
                        SongInfo.isPlaying = true;

                    } else {
                        $j(trackButton).html(this.playButtonTemplate);
                        this.playPauseButton.removeClass("ion-pause").addClass("ion-play");
                        SongInfo.currentSoundFile.pause();
                        SongInfo.isPlaying = false;
                    }
                }
            }
        };
    }])

    .factory("PlayerBarControls", ["GetAlbum", "SongInfo", "PlayAlbum", function (GetAlbum, SongInfo, PlayAlbum) {
        "use strict";

        var $j = jQuery.noConflict();
        var collection, volumeFill, volumeThumb;
        collection = GetAlbum.collection;

        return {
            playPause: function () {
                if (!SongInfo.currentSoundFile) {
                    PlayAlbum.setSong(1);
                    SongInfo.currentSoundFile.play();
                    SongInfo.isPlaying = true;

                    volumeFill = $j(".volume .fill");
                    volumeThumb = $j(".volume .thumb");
                    volumeFill.width(SongInfo.currentVolume + '%');
                    volumeThumb.css({left: SongInfo.currentVolume + '%'});

                    PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).html(PlayAlbum.pauseButtonTemplate);
                    $j(PlayAlbum.playPauseButton).removeClass("ion-play").addClass("ion-pause");
                } else if (SongInfo.currentSoundFile.isPaused()) {
                    $j(PlayAlbum.getSongNumberButton).html(PlayAlbum.pauseButtonTemplate);
                    $j(PlayAlbum.playPauseButton).html(PlayAlbum.playPauseButton);
                    SongInfo.currentSoundFile.play();
                    SongInfo.isPlaying = true;
                } else if (SongInfo.currentSoundFile) {
                    $j(PlayAlbum.getSongNumberButton).html(PlayAlbum.playButtonTemplate);
                    $j(PlayAlbum.playPauseButton).html(PlayAlbum.playPauseButton);
                    SongInfo.currentSoundFile.pause();
                    SongInfo.isPlaying = true;
                }
            },
            nextSong: function () {
                var startingNumber, nextIndex;
                startingNumber = SongInfo.currentlyPlayingSongNumber;
                nextIndex = SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) === (SongInfo.currentAlbum.songs.length - 1) ? 0 : (SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) + 1);

                PlayAlbum.setSong(nextIndex + 1);
                SongInfo.currentSoundFile.play();
                SongInfo.isPlaying = true;

                PlayAlbum.playPauseButton.removeClass("ion-play").addClass("ion-pause");
                PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).html(PlayAlbum.pauseButtonTemplate);
                PlayAlbum.getSongNumberButton(startingNumber).html(startingNumber);
            },
            previousSong: function () {
                var startingNumber, previousIndex;
                startingNumber = SongInfo.currentlyPlayingSongNumber;
                previousIndex = SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) === 0 ? (SongInfo.currentAlbum.songs.length - 1) : (SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) - 1);

                PlayAlbum.setSong(previousIndex + 1);
                SongInfo.currentSoundFile.play();
                SongInfo.isPlaying = true;

                PlayAlbum.playPauseButton.removeClass("ion-play").addClass("ion-pause");
                PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).html(PlayAlbum.pauseButtonTemplate);
                PlayAlbum.getSongNumberButton(startingNumber).html(startingNumber);
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
            clickSeekBarPosition: function (event) {
                // summary:
                //      Determines fill ratio based on where you clicked
                // var OffsetX:
                //      Gets the distance from left edge of seek bar
                // var barWidth:
                //      Gets width of seek bar
                // returns: Number
                //      Ratio of seek bar offset X to width of bar

                var offsetX, barWidth, seekBarFillRatio;
                offsetX = event.clientX - $j(event.target).offset().left;
                barWidth = $j(event.target).width();
                seekBarFillRatio = offsetX / barWidth;

                if ($j(event.target).parent().attr('class') === 'seek-control') {
                    this.seek(seekBarFillRatio * SongInfo.currentSoundFile.getDuration());
                } else {
                    PlayAlbum.setVolume(seekBarFillRatio * 100);
                }

                this.updateSeekPercentage($j(event.target), seekBarFillRatio);

            }

        };

    }]);