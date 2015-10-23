angular.module("services")

    .factory("PlayAlbum", ["$stateParams", "GetAlbum", "SongInfo", "$q", function ($stateParams, GetAlbum, SongInfo, $q) {
        "use strict";

        var collection, $j, trackButton, songNumber, volumeFill, volumeThumb, PlayAlbum;
        collection = GetAlbum.collection;
        $j = jQuery.noConflict();
        PlayAlbum = this;

        return {
            albumData: function (info, num) {
                return collection.then(function (albums) {
                    var albumCollection, album;
                    albumCollection = albums.data;
                    album = albums.data[GetAlbum.getAlbumById(albumCollection, $stateParams.id)];
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
                var deferred = $q.defer();

                if (SongInfo.currentSoundFile) {
                    SongInfo.currentSoundFile.stop();
                }
                SongInfo.currentlyPlayingSongNumber = parseInt(number);
                SongInfo.currentSoundFileDeferred = deferred.promise;
                this.albumData("songs", number).then(function (track) {
                    SongInfo.currentSongFromAlbum = track;
                    console.log(SongInfo.currentSongFromAlbum);
                    deferred.resolve(new buzz.sound(SongInfo.currentSongFromAlbum.audioUrl, {
                        formats: ['mp3'],
                        preload: true
                    }));

                });
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
                if ($event.target.nodeName === "BUTTON") {
                    trackButton = $event.target;
                } else {
                    trackButton = $event.target.parentElement;
                }
                songNumber = parseInt($event.target.getAttribute('data-song-number'));
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
                    SongInfo.currentSoundFileDeferred.then(function (currentSoundFile) {
                        SongInfo.currentSoundFile = currentSoundFile;
                        SongInfo.currentSoundFile.play();
                        SongInfo.isPlaying = true;
                    });

                    volumeFill = $j(".volume .fill");
                    volumeThumb = $j(".volume .thumb");
                    volumeFill.width(SongInfo.currentVolume + '%');
                    volumeThumb.css({left: SongInfo.currentVolume + '%'});

                    $j(PlayAlbum.playPauseButton).removeClass("ion-play").addClass("ion-pause");
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
    }]);

