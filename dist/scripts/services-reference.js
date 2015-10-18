var angular, albumMarconi, albumPicasso, albumSweetLittle, buzz; //To remove a few jslint errors.
var jamsModule = angular.module('blocJamsss', ['ui.router']);

jamsModule.config(function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $stateProvider.state('landing',{
        url: '/',
        controller: 'LandingController',
        templateUrl: '/templates/landing.html'
    });
    $stateProvider.state('album',{
        url: '/album',
        controller: 'AlbumController',
        templateUrl: '/templates/album.html'
    });
    $stateProvider.state('collection',{
        url: '/collection',
        controller: 'CollectionController',
        templateUrl: '/templates/collection.html'
    });
});

//===================================================CONTROLLERS========================================================

jamsModule.controller('LandingController', function($scope){
    $scope.tagline = "Turn the music up!";
});

jamsModule.controller('CollectionController', ['$scope', 'SongInfo', function($scope, SongInfo){
    $scope.albums = SongInfo.albumList;
}]);

jamsModule.controller('AlbumController', ['$interval', '$scope', 'SongInfo', 'PlayAlbum', 'PlayerBarControls', function($interval, $scope, SongInfo, PlayAlbum, PlayerBarControls){
    var albumPicasso = SongInfo.albumList[1];
    var albumMarconi = SongInfo.albumList[2];
    var setCurrentAlbum = function(album) {
        SongInfo.currentAlbum = album;
    };

    setCurrentAlbum(albumPicasso);
    $scope.currentAlbum = SongInfo.currentAlbum;
    $scope.currentSongFromAlbum = function() {
        return SongInfo.currentSongFromAlbum;
    };

    $scope.showPlayPause = function($event){
        var songNumberRow;
        if ($event.target.parentElement.nodeName === 'TR') {
            songNumberRow = $event.target.parentElement;
        } else {
            songNumberRow = $event.target.parentElement.parentElement;
        }
        var songNumberButton = songNumberRow.childNodes[1].childNodes[1];
        var songNumber = parseInt(songNumberButton.getAttribute('data-song-number'));
        if (songNumber !== SongInfo.currentlyPlayingSongNumber) {
            songNumberButton.innerHTML = PlayAlbum.playButtonTemplate;
        }
    };

    $scope.hidePlayPause= function($event) {
        var songNumberRow;
        if ($event.target.parentElement.nodeName === 'TR') {
            songNumberRow = $event.target.parentElement;
        } else {
            songNumberRow = $event.target.parentElement.parentElement;
        }
        var songNumberButton = songNumberRow.childNodes[1].childNodes[1];
        var songNumber = parseInt(songNumberButton.getAttribute('data-song-number'));
        if (songNumber !== SongInfo.currentlyPlayingSongNumber) {
            songNumberButton.innerHTML = songNumber;
        }
    };

    $scope.playPauseSong = function(track) {
        PlayAlbum.playPauseSong(track);
    };

    $scope.playPause = function(){
        PlayerBarControls.playPause();
    };

    $scope.next = function() {
        PlayerBarControls.next();
    };

    $scope.previous = function (){
        PlayerBarControls.previous();
    };

    $scope.currentTrackDuration = function(){
        if (SongInfo.currentSoundFile){
            return SongInfo.currentSoundFile.getDuration();
        }
    };

    var playOrPause;
    var runTime = function() {
        playOrPause = $interval( function(){
            if (SongInfo.isPlaying){
                $scope.currentTrackTime = SongInfo.currentSoundFile.getTime();
                var seekBarFillRatio = SongInfo.currentSoundFile.getTime() / SongInfo.currentSoundFile.getDuration();
                var seekBar = document.querySelector('.seek-control .seek-bar');
                PlayerBarControls.updateSeekPercentage(seekBar, seekBarFillRatio);
            } else if (!SongInfo.isPlaying) {
                $scope.stopTime();
            }
        }, 100);
    };

    $scope.stopTime = function(scope) {
        $interval.cancel(playOrPause);
    };

    $scope.$watch(function(){
        return SongInfo.isPlaying;
    }, function(){
        runTime();
    });

    $scope.$watch(function(){
        if(SongInfo.currentSoundFile){
            return SongInfo.currentSoundFile.isEnded();
        }
    }, function(){
        if (SongInfo.currentSoundFile){
            if (SongInfo.currentSoundFile.isEnded()){
                SongInfo.isPlaying = false;
                console.log('stop it');
            }
        }
    });
//  $scope.clickSeekBarPosition = function($event){
//    PlayerBarControls.clickSeekBarPosition($event);
//  }; // TODO Move this to directive.
}]);

//================================================== DIRECTIVES ========================================================

jamsModule.directive('abSeekBars',['SongInfo','PlayerBarControls','PlayAlbum', function(SongInfo,PlayerBarControls, PlayAlbum){
    "use strict";

    return {
        scope: true,
        replace: true,
        restrict: 'E',
        templateUrl: '../templates/seekbar.html',
        link: function link(scope, element, attrs){
            scope.clickSeekBarPosition = function($event){
                PlayerBarControls.clickSeekBarPosition($event);
            };

            scope.dragSeekBarPosition = function($event) {
                // start using jQuery
                var $seekBars = $('.player-bar .seek-bar');
                var updateSeekPrct = function(seekbar, seekbarFillRatio){
                    PlayerBarControls.updateSeekPercentage(seekbar, seekbarFillRatio);
                };

                $seekBars.find('.thumb').mousedown(function($event){
                    //console.log(event.target);
                    var $seekBar = $event.target.parentElement;
                    function getOffsetLeft( elem ) {
                        var offsetLeft = 0;
                        do {
                            if ( !isNaN( elem.offsetLeft ) ) {
                                offsetLeft += elem.offsetLeft;
                            }
                        } while(elem = elem.offsetParent);
                        return offsetLeft;
                        // http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
                    }

                    $(document).bind('mousemove.thumb', function ($event){
                        var barOffset = getOffsetLeft($seekBar);
                        var offsetX = $event.pageX - barOffset;
                        var barWidth = $seekBar.offsetWidth;
                        var seekBarFillRatio = offsetX / barWidth;

                        if ($seekBar.getAttribute('info') === 'seek-control') {
                            //console.log('event.pageX: '+ $event.pageX + '; SB.offsetLeft: ' + barOffset);
                            //console.log('ratio: '+ seekBarFillRatio.toFixed(2) + '; offsetX: ' + offsetX + '; barWidth: ' + barWidth);
                            PlayerBarControls.seek(seekBarFillRatio * SongInfo.currentSoundFile.getDuration());
                        } else {
                            PlayAlbum.setVolume(seekBarFillRatio * 100);
                        }

                        updateSeekPrct($seekBar, seekBarFillRatio);

                    });

                    $(document).bind('mouseup.thumb', function(){
                        $(document).unbind('mousemove.thumb');
                        $(document).unbind('mouseup.thumb');
                    });

                });
                // end using jQuery
            };
        }
    };
}]);

//==================================================== SERVICES ========================================================

jamsModule.service('SongInfo', function(){
    return {
        albumList: [albumSweetLittle, albumPicasso, albumMarconi],
        currentAlbum: null,
        currentlyPlayingSongNumber: null,
        currentSongFromAlbum: null,
        currentSoundFile: null,
        currentVolume: 15,
        isPlaying: false
    };
});

jamsModule.service('PlayAlbum', ['SongInfo',  function(SongInfo){
    return {
        playButtonTemplate: '<i class="ion-play"></i>',
        pauseButtonTemplate:'<i class="ion-pause"></i>',
        //TODO move templates into album.html
        setVolume: function(volume) {
            if (SongInfo.currentSoundFile) {
                SongInfo.currentSoundFile.setVolume(volume);
            }
        },
        setSong: function(number) {
            if(SongInfo.currentSoundFile) {
                SongInfo.currentSoundFile.stop();
            }
            SongInfo.currentlyPlayingSongNumber = parseInt(number);
            SongInfo.currentSongFromAlbum = SongInfo.currentAlbum.songs[number - 1];
            SongInfo.currentSoundFile = new buzz.sound(SongInfo.currentSongFromAlbum.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            this.setVolume(SongInfo.currentVolume);
        },
        playPauseButton: angular.element(document.getElementsByClassName('play-pause')[0]),
        getSongNumberButton: function(number) {
            return document.querySelector('button[data-song-number="' + number + '"]');
        },
        playPauseSong: function($event) {
            var trackButton = $event.target;
            var songNumber = parseInt($event.target.getAttribute('data-song-number'));

            if (SongInfo.currentlyPlayingSongNumber !== null) {
                trackButton.innerHTML = SongInfo.currentlyPlayingSongNumber;
            }
            if (SongInfo.currentlyPlayingSongNumber !== songNumber) {
                this.setSong(songNumber);
                SongInfo.currentSoundFile.play();
                SongInfo.isPlaying = true;

                this.playPauseButton.removeClass("ion-play").addClass("ion-pause");
                //console.log(trackButton.find('i'));
                //trackButton.find('i').removeClass("ion-play").addClass("ion-pause");

                var volumeFill = document.querySelector('.volume .fill');
                var volumeThumb = document.querySelector('.volume .thumb');
                volumeFill.style.width = SongInfo.currentVolume + '%';
                volumeThumb.style.left = SongInfo.currentVolume + '%';

                //console.log(trackButton.childNodes[0]);
                trackButton.innerHTML = this.pauseButtonTemplate;
            }
            else if (SongInfo.currentlyPlayingSongNumber === songNumber) {
                if (SongInfo.currentSoundFile.isPaused()) {
                    trackButton.innerHTML = this.pauseButtonTemplate;
                    this.playPauseButton.removeClass("ion-play").addClass("ion-pause");
                    SongInfo.currentSoundFile.play();
                    SongInfo.isPlaying = true;
                } else {
                    trackButton.innerHTML = this.playButtonTemplate;
                    this.playPauseButton.removeClass("ion-pause").addClass("ion-play");
                    SongInfo.currentSoundFile.pause();
                    SongInfo.isPlaying = false;
                }
            }
        }
    };
}]);

jamsModule.service('PlayerBarControls', ['$interval', 'SongInfo', 'PlayAlbum', function($interval, SongInfo, PlayAlbum){
    return {
        playPause: function() {
            if (!SongInfo.currentSoundFile) {
                PlayAlbum.setSong(1);
                SongInfo.currentSoundFile.play();
                SongInfo.isPlaying = true;

                var volumeFill = document.querySelector('.volume .fill');
                var volumeThumb = document.querySelector('.volume .thumb');
                volumeFill.style.width = SongInfo.currentVolume + '%';
                volumeThumb.style.left = SongInfo.currentVolume + '%';

                PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).innerHTML = PlayAlbum.pauseButtonTemplate;
                PlayAlbum.playPauseButton.removeClass("ion-play").addClass("ion-pause");
            }
            else if (SongInfo.currentSoundFile.isPaused()) {
                PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).innerHTML = PlayAlbum.pauseButtonTemplate;
                PlayAlbum.playPauseButton.removeClass("ion-play").addClass("ion-pause");
                SongInfo.currentSoundFile.play();
                SongInfo.isPlaying = true;
            }
            else if (SongInfo.currentSoundFile) {
                PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).innerHTML = PlayAlbum.playButtonTemplate;
                PlayAlbum.playPauseButton.removeClass("ion-pause").addClass("ion-play");
                SongInfo.currentSoundFile.pause();
                SongInfo.isPlaying = false;
            }
        },
        next: function(){
            var startingNumber = SongInfo.currentlyPlayingSongNumber;
            var nextIndex = SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) === (SongInfo.currentAlbum.songs.length - 1) ? 0 : (SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) + 1);

            PlayAlbum.setSong(nextIndex + 1);
            SongInfo.currentSoundFile.play();
            SongInfo.isPlaying = true;

            PlayAlbum.playPauseButton.removeClass("ion-play").addClass("ion-pause");
            PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).innerHTML = PlayAlbum.pauseButtonTemplate;
            PlayAlbum.getSongNumberButton(startingNumber).innerHTML = startingNumber;
        },
        previous: function() {
            var startingNumber = SongInfo.currentlyPlayingSongNumber;
            var previousIndex = (SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum)) === 0 ? SongInfo.currentAlbum.songs.length - 1 : (SongInfo.currentAlbum.songs.indexOf(SongInfo.currentSongFromAlbum) - 1);

            PlayAlbum.setSong(previousIndex + 1);
            SongInfo.currentSoundFile.play();
            SongInfo.isPlaying = true;

            PlayAlbum.playPauseButton.removeClass("ion-play").addClass("ion-pause");
            PlayAlbum.getSongNumberButton(SongInfo.currentlyPlayingSongNumber).innerHTML = PlayAlbum.pauseButtonTemplate;
            PlayAlbum.getSongNumberButton(startingNumber).innerHTML = startingNumber;
        },
        seek: function(time) {
            if (SongInfo.currentSoundFile) {
                SongInfo.currentSoundFile.setTime(time);
            }
        },
        updateSeekPercentage: function (seekBar, seekBarFillRatio){
            var offsetXPercent = seekBarFillRatio * 100;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(100, offsetXPercent);
            var percentageString = offsetXPercent + '%';
            seekBar.getElementsByClassName('fill')[0].style.width = percentageString;
            seekBar.getElementsByClassName('thumb')[0].style.left = percentageString;
        },
        clickSeekBarPosition: function(event) {
            var offsetX = event.clientX - event.target.getBoundingClientRect().left;
            var barWidth = event.target.offsetWidth;
            var seekBarFillRatio = offsetX / barWidth;
            if (event.target.parentElement.getAttribute('class') === 'seek-control') {
                this.seek(seekBarFillRatio * SongInfo.currentSoundFile.getDuration());
            } else {
                PlayAlbum.setVolume(seekBarFillRatio * 100);
            }
            this.updateSeekPercentage(event.target, seekBarFillRatio);
        }
    };

}]);
