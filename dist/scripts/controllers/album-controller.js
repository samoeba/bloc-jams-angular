//noinspection JSLint
angular.module('blocJams')

    .factory('albums', function($http) {
        "use strict";

        return {
            getAlbums: function() {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get('/data/albums.json').then(function(result) {
                    return result.data;
                });
            }
        };
    })

    .controller('AlbumController', ['$scope', 'albums', function ($scope, albums) {
        "use strict";

        albums.getAlbums().then(function(data) {
            //this will execute when the
            //AJAX call completes.
            $scope.collection = data;
        });

        console.log(albums.getAlbums());


        //$http({ method: 'GET', url: '/data/albums.json' }).success(function (data) {
        //    console.log("Made it this far.");
        //    $scope.collection = data;
        //    //var albumPicasso, albumMarconi, albumDylan, albumModest, albumBarnett;
        //    //albumPicasso = $scope.collection[0];
        //    //albumMarconi = $scope.collection[1];
        //    //albumDylan = $scope.collection[2];
        //    //albumModest = $scope.collection[3];
        //    //albumBarnett = $scope.collection[4];
        //    //return [albumPicasso, albumMarconi, albumDylan, albumModest, albumBarnett];
        //})

        //var albums = someFunction();
        //var albumPicasso = albums[0];
        //console.log(albumPicasso);

        //noinspection JSLint
        var $j = jQuery.noConflict();

        $j(function () {

            var xyz = 1;

            console.log(xyz);
//
//            //Creates a row of data for each song
//            var createSongRow = function(songNumber, songName, songLength) {
//
//                ////HTML for song row
//                //var template =
//                //        '<tr class="album-view-song-item">'
//                //        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
//                //        + '  <td class="song-item-title">' + songName + '</td>'
//                //        + '  <td class="song-item-duration">' + songLength + '</td>'
//                //        + '</tr>'
//                //    ;
//
//                //Variable for the HTML
//                var $row = $j(".album-view-song-item");
//
//                //Determines status of clicked song row and changes accordingly
//                var clickHandler = function() {
//
//                    var songNumber = parseInt($j(this).attr('data-song-number'));
//
//
//                    if (currentlyPlayingSongNumber !== null) {
//                        var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
//                        currentlyPlayingCell.html(currentlyPlayingSongNumber);
//                    }
//
//                    if (currentlyPlayingSongNumber !== songNumber) {
//                        $j(this).html(pauseButtonTemplate);
//                        setSong(songNumber);
//                        currentSoundFile.play();
//
//                        updateSeekBarWhileSongPlays();
//
//                        updatePlayerBarSong();
//                    }
//
//                    //If the currentlyPlayingSongNumber is equal to the song row we just clicked then it will either pause or play it
//                    else if (currentlyPlayingSongNumber === songNumber) {
//                        if (currentSoundFile.isPaused()) {
//                            $j(this).html(pauseButtonTemplate);
//                            $playPauseButton.html(playerBarPauseButton);
//                            currentSoundFile.play();
//
//                            updateSeekBarWhileSongPlays();
//                        } else {
//                            $j(this).html(playButtonTemplate);
//                            $j('.left-controls.play-pause').html(playerBarPlayButton);
//                            currentSoundFile.pause();
//
//                            $playPauseButton.html(playerBarPlayButton);
//                        }
//                    }
//
//                };
//
//                var onHover = function() {
//                    var songNumberCell = $j(this).find('.song-item-number');
//                    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
//
//                    if (songNumber !== currentlyPlayingSongNumber) {
//                        songNumberCell.html(playButtonTemplate);
//                    }
//                };
//
//                var offHover = function() {
//                    var songNumberCell = $j(this).find('.song-item-number');
//                    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
//
//                    if (songNumber !== currentlyPlayingSongNumber) {
//                        songNumberCell.html(songNumber);
//                    }
//                };
//
//                $row.find('.song-item-number').click(clickHandler);
//
//                $row.hover(onHover, offHover);
//
//                return $row
//
//            };
//
//            var setCurrentAlbum = function(album) {
//
//                currentAlbum = album;
//
//                var $albumTitle = $j('.album-view-title');
//                var $albumArtist = $j('.album-view-artist');
//                var $albumReleaseInfo = $j('.album-view-release-info');
//                var $albumImage = $j('.album-cover-art');
//                var $albumSongList = $j('.album-view-song-list');
//
//                $albumTitle.text(album.name);
//                $albumArtist.text(album.artist);
//                $albumReleaseInfo.text(album.year + ' ' + album.label);
//                $albumImage.attr('src', album.albumArtUrl);
//                $albumSongList.empty();
//
//                for (var i = 0; i < album.songs.length; i++) {
//                    var sound = new buzz.sound(album.songs[i].audioUrl, {  formats: [ 'mp3' ],   preload: 'metadata'  });
//                    var mySound = function(i,sound){
//                        var $newRow = createSongRow(i + 1, album.songs[i].name);
//                        $albumSongList.append($newRow);
//                        return function(){
//                            var length = sound.getDuration();
//                            currentSongDurations.push(length);
//                            $newRow.find('.song-item-duration').text(filterTimeCode(length));
//                        }
//                    };
//                    sound.bind("loadedmetadata", mySound(i,sound));
//                }
//            };
//
////------------------------------------------------SEEK BAR----------------------------------------------------------------------
//
//            var setCurrentTimeInPlayerBar = function(currentTime) {
//                var curTime = $j('.current-time').html(filterTimeCode(currentTime));
//            };
//
//            var setTotalTimeInPlayerBar = function() {
//                var totTime = $j('.total-time').html(filterTimeCode(currentSongDuration));
//            };
//
//            var filterTimeCode = function(timeInSeconds) {
//                var time = parseFloat(timeInSeconds);
//                var wholeMinutes = Math.floor(time/60);
//                var wholeSeconds = Math.floor(time % 60);
//                if (wholeSeconds >= 10) {
//                    var formatTime = wholeMinutes + ":" + wholeSeconds;
//                } else {
//                    var formatTime = wholeMinutes + ":0" + wholeSeconds;
//                }
//
//                return formatTime;
//            };
//
//            var updateSeekBarWhileSongPlays = function() {
//
//                if (currentSoundFile) {
//                    // #1
//                    currentSoundFile.bind('timeupdate', function(event) {
//                        // #2
//                        var seekBarFillRatio = this.getTime() / this.getDuration();
//                        var $seekBar = $j('.seek-control .seek-bar');
//
//                        updateSeekPercentage($seekBar, seekBarFillRatio);
//
//                        setCurrentTimeInPlayerBar(this.getTime());
//                        resetSong();
//                    });
//                }
//
//            };
//
//            var updateSeekPercentage = function(/*jQuery node*/$seekBar, /*Number*/seekBarFillRatio) {
//                // summary:
//                //      Updates the seek bar percentage based on where the thumb is inside the bar.
//                // $seekbar: jQuery node
//                //      The seekbar to apply the css
//                // seekbarFillRatio: Number
//                //      Fill percentage of the seek bar. Provided by setupSeekBars func.
//                // returns: String
//                //      percentageString for fill and thumb classes (still needs fill ratio to complete percentage
//
//                var offsetXPercent = seekBarFillRatio * 100;
//
//                //Returns number between 0 and 100
//                offsetXPercent = Math.max(0, offsetXPercent);
//                offsetXPercent = Math.min(100, offsetXPercent);
//
//                var percentageString = offsetXPercent + '%';
//                $seekBar.find('.fill').width(percentageString);
//                $seekBar.find('.thumb').css({left: percentageString});
//
//            };
//
//            var setupSeekBars = function() {
//                // summary:
//                //      Declares variable seek bar and allows user to click and drag thumb around
//                // returns: Object
//                //      What that object is
//
//                var $seekBars = $j('.player-bar .seek-bar');
//
//                $seekBars.click(function(event) {
//                    // summary:
//                    //      Determines fill ratio based on where you clicked
//                    // var OffsetX:
//                    //      Gets the distance from left edge of seek bar
//                    // var barWidth:
//                    //      Gets width of seek bar
//                    // returns: Number
//                    //      Ratio of seek bar offset X to width of bar
//
//                    var offsetX = event.pageX - $j(this).offset().left;
//                    var barWidth = $j(this).width();
//                    var seekBarFillRatio = offsetX / barWidth;
//
//                    if ($j(this).parent().attr('class') == 'seek-control') {
//                        seek(seekBarFillRatio * currentSoundFile.getDuration());
//                    } else {
//                        setVolume(seekBarFillRatio * 100);
//                    }
//
//                    updateSeekPercentage($j(this), seekBarFillRatio);
//                });
//
//                $seekBars.find('.thumb').mousedown(function(event) {
//                    // summary:
//                    //      Finds thumb class and assigns mousedown event to it, making it move with users cursor
//                    // mousemove event:
//                    //      Binds mousemove to thumb so that where ever the cursor moves so does the thumb while also updating fill of seekbar
//                    // mouseup event:
//                    //      Unbinds movemove and mouseup events
//
//                    var $seekBar = $j(this).parent();
//
//                    $j(document).bind('mousemove.thumb', function(event){
//                        var offsetX = event.pageX - $seekBar.offset().left;
//                        var barWidth = $seekBar.width();
//                        var seekBarFillRatio = offsetX / barWidth;
//
//                        if ($j(this).parent().attr('class') == 'seek-control') {
//                            seek(seekBarFillRatio * currentSoundFile.getDuration());
//                        } else {
//                            setVolume(seekBarFillRatio * 100);
//                        }
//
//                        updateSeekPercentage($seekBar, seekBarFillRatio);
//                    });
//
//                    $j(document).bind('mouseup.thumb', function() {
//                        $j(document).unbind('mousemove.thumb');
//                        $j(document).unbind('mouseup.thumb');
//                    });
//
//                });
//
//            };
//
//            var resetSong = function(){
//                var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
//                if (currentSoundFile.isEnded()){
//                    if (currentSongIndex >= currentAlbum.songs.length -1) {
//                        currentSoundFile.stop();
//                        $j('.album-song-button').html(playButtonTemplate);
//                        $playPauseButton.html(playerBarPlayButton);
//                    }
//                    else {
//                        nextSong();
//                    }
//                }
//            };
//
////-----------------------------------------------END SEEK BAR-----------------------------------------------------------------------
//
//
//            var trackIndex = function(album, song) {
//                return album.songs.indexOf(song);
//            };
//
//            var updatePlayerBarSong = function() {
//
//                $j('.currently-playing .song-name').text(currentSongFromAlbum.name);
//                $j('.currently-playing .artist-name').text(currentAlbum.artist);
//                $j('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
//                $playPauseButton.html(playerBarPauseButton);
//
//                setTotalTimeInPlayerBar();
//            };
//
//            var togglePlayFromPlayerBar = function() {
//                if (currentlyPlayingSongNumber === null) {
//                    return nextSong();
//                }
//
//                var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
//
//                if (currentSoundFile.isPaused()) {
//                    currentlyPlayingCell.html(pauseButtonTemplate);
//                    $playPauseButton.html(playerBarPauseButton);
//                    currentSoundFile.play();
//                } else if (currentSoundFile) {
//                    currentlyPlayingCell.html(playButtonTemplate);
//                    $playPauseButton.html(playerBarPlayButton);
//                    currentSoundFile.pause();
//                }
//            };
//
//            var setSong = function(songNumber) {
//                if (currentSoundFile) {
//                    currentSoundFile.stop();
//                }
//
//                currentlyPlayingSongNumber = parseInt(songNumber);
//                currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
//                currentSongDuration = currentSongDurations[songNumber - 1];
//                currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
//                    formats: [ 'mp3' ],
//                    preload: true
//                });
//
//                setVolume(currentVolume);
//            };
//
//            var seek = function(time) {
//                if (currentSoundFile) {
//                    currentSoundFile.setTime(time);
//                }
//            };
//
//            var setVolume = function(volume) {
//                if (currentSoundFile) {
//                    currentSoundFile.setVolume(volume)
//                }
//            };
//
//            var getSongNumberCell = function(number) {
//                return $j('.song-item-number[data-song-number="' + number + '"]');
//            };
//
//            var nextSong = function() {
//
//                var getLastSongNumber = function(index) {
//                    return index == 0 ? currentAlbum.songs.length : index;
//                };
//
//                var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
//                currentSongIndex++;
//
//                if (currentSongIndex >= currentAlbum.songs.length) {
//                    currentSongIndex = 0;
//                }
//
//                setSong(currentSongIndex + 1);
//                currentSoundFile.play();
//                updateSeekBarWhileSongPlays();
//                updatePlayerBarSong();
//
//                var lastSongNumber = getLastSongNumber(currentSongIndex);
//                var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
//                var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
//
//                $nextSongNumberCell.html(pauseButtonTemplate);
//                $lastSongNumberCell.html(lastSongNumber);
//
//            };
//
//            var previousSong = function() {
//
//                var getLastSongNumber = function(index) {
//                    return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
//                };
//
//                var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
//                currentSongIndex--;
//
//                if (currentSongIndex < 0) {
//                    currentSongIndex = currentAlbum.songs.length - 1;
//                }
//
//                setSong(currentSongIndex + 1);
//                currentSoundFile.play();
//                updateSeekBarWhileSongPlays();
//                updatePlayerBarSong();
//
//                var lastSongNumber = getLastSongNumber(currentSongIndex);
//                var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
//                var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
//
//                $previousSongNumberCell.html(pauseButtonTemplate);
//                $lastSongNumberCell.html(lastSongNumber);
//
//            };
//
//            var $playPauseButton = $j('.left-controls .play-pause');
//            var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
//            var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
//            var playerBarPlayButton = '<span class="ion-play"></span>';
//            var playerBarPauseButton = '<span class="ion-pause"></span>';
//
//            var currentAlbum = null;
//            var currentlyPlayingSongNumber = null;
//            var currentSongFromAlbum = null;
//            var currentSoundFile = null;
//            var currentSongDurations=[];
//            var currentSongDuration = null;
//            var currentVolume = 80;
//            var volumeFill = $j(".volume .fill");
//            var volumeThumb = $j(".volume .thumb");
//            volumeFill.width(currentVolume + '%');
//            volumeThumb.css({left: currentVolume + '%'});
//            var fillStart = $j(".seek-control .fill");
//            fillStart.width(0);
//
//            var $previousButton = $j('.left-controls .previous');
//            var $nextButton = $j('.left-controls .next');
//
//            $j(document).ready(function() {
//
//                setCurrentAlbum(albumPicasso);
//                $previousButton.click(previousSong);
//                $nextButton.click(nextSong);
//                $playPauseButton.click(togglePlayFromPlayerBar);
//                setupSeekBars();
//
//                document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function () {
//
//                    if (document.getElementsByClassName("album-view-artist")[0].textContent == "Pablo Picasso") {
//                        setCurrentAlbum(albumDylan);
//                    } else if (document.getElementsByClassName("album-view-artist")[0].textContent == "Bob Dylan") {
//                        setCurrentAlbum(albumMarconi);
//                    } else {
//                        setCurrentAlbum(albumPicasso);
//                    }
//
//                });
//
//            });

    });
}]);