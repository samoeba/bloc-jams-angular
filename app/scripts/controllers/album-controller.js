//noinspection JSLint
var $j = jQuery.noConflict();

//noinspection JSLint
angular.module("blocJams")

    .controller('AlbumController', ["$scope", "$stateParams", "$interval", "GetAlbum", "SongInfo", "PlayAlbum", "PlayerBarControls", function ($scope, $stateParams, $interval, GetAlbum, SongInfo, PlayAlbum, PlayerBarControls) {
        "use strict";

        //$.when(getStaticCollection && staticCollection || collection).then()

        var collection = GetAlbum.collection;

        collection.then(function (albums) {
            $scope.collection = albums.data;
            $scope.album = albums.data[GetAlbum.getAlbumById($scope.collection, $stateParams.id)];
        });

        $scope.pretendClick = function () {
            collection.then(function () {
                return $scope.album.songs[1];
            });
        };

        $scope.pretendClick();

        //============================================ Model Communication =============================================

        $scope.currentSongFromAlbum = function() {
            return SongInfo.currentSongFromAlbum;
        };

        $scope.showPlayPause = function (event) {
            //console.log(event.target.parentElement.nodeName);
            var songNumberRow, songNumberButton, songNumber;
            if (event.target.parentElement.nodeName === "TR") {
                songNumberRow = event.target.parentElement;
            } else if (event.target.parentElement.nodeName === "TD") {
                songNumberRow = event.target.parentElement.parentElement;
            } else {
                songNumberRow = event.target.parentElement.parentElement.parentElement;
            }
            songNumberButton = songNumberRow.childNodes[1].childNodes[1];
            songNumber = parseInt(songNumberButton.getAttribute("data-song-number"));
            if (songNumber !== SongInfo.currentlyPlayingSongNumber) {
                $j(songNumberButton).html(PlayAlbum.playButtonTemplate);
            }
        };

        $scope.hidePlayPause = function (event) {
            var songNumberRow, songNumberButton, songNumber;
            if (event.target.parentElement.nodeName === 'TR') {
                songNumberRow = event.target.parentElement;
            } else {
                songNumberRow = event.target.parentElement.parentElement;
            }
            songNumberButton = songNumberRow.childNodes[1].childNodes[1];
            songNumber = parseInt(songNumberButton.getAttribute("data-song-number"));
            if (songNumber !== SongInfo.currentlyPlayingSongNumber) {
                $j(songNumberButton).html(songNumber);
            }
        };

        $scope.playPauseSong = function($event) {
            PlayAlbum.playPauseSong($event);
        };

        $scope.playPause = function() {
            PlayerBarControls.playPause();
        };

        $scope.nextSong = function() {
            PlayerBarControls.nextSong();
        };

        $scope.previousSong = function() {
            PlayerBarControls.previousSong();
        };

        $scope.currentTrackDuration = function() {
            if (SongInfo.currentSoundFile){
                return SongInfo.currentSoundFile.getDuration();
            }
        };

        var runTime, playOrPause;
        runTime = function() {
            playOrPause = $interval(function() {
                if (SongInfo.isPlaying) {
                    $scope.currentTrackTime = SongInfo.currentSoundFile.getTime();
                    var seekBar = document.querySelector(".player-bar .seek-bar");
                    var seekBarFillRatio = SongInfo.currentSoundFile.getTime() / $scope.currentTrackDuration();
                    PlayerBarControls.updateSeekPercentage(seekBar, seekBarFillRatio);
                } else if (!SongInfo.isPlaying) {
                    $scope.stopTime();
                }
            }, 500);
        };

        $scope.stopTime = function() {
            $interval.cancel(playOrPause);
        };

        $scope.$watch(function() {
            return SongInfo.isPlaying;
        }, function() {
            runTime();
        });

        $scope.$watch(function() {
            if (SongInfo.currentSoundFile) {
                return SongInfo.currentSoundFile.isEnded();
            }
        }, function() {
            if (SongInfo.currentSoundFile) {
                if (SongInfo.currentSoundFile.isEnded()) {
                    SongInfo.isPlaying = false;
                    console.log("Song not playing");
                }
            }
        });

        $j(function () {
            console.log("jQuery ready function");

            //console.log($j(".album-view-song-item").children());
            //console.log(document.getElementsByClassName("album-view-song-item"));

        });

    }]);
