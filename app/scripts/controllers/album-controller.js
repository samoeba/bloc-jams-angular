angular.module('blocJams')

.controller('AlbumController', ['$scope', '$http', function ($scope, $http) {

        $http({ method: 'GET', url: '/data/albums.json' }).success(function (data) {
            console.log("Made it this far.");
            $scope.collection = data;
        });

//        $(function () {
//
//            //Creates a row of data for each song
//            var createSongRow = function(songNumber, songName, songLength) {
//
//                //HTML for song row
//                var template =
//                        '<tr class="album-view-song-item">'
//                        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
//                        + '  <td class="song-item-title">' + songName + '</td>'
//                        + '  <td class="song-item-duration">' + songLength + '</td>'
//                        + '</tr>'
//                    ;
//
//                //Variable for the HTML
//                var $row = $(template);
//
//                //Determines status of clicked song row and changes accordingly
//                var clickHandler = function() {
//
//                    var songNumber = parseInt($(this).attr('data-song-number'));
//
//
//                    if (currentlyPlayingSongNumber !== null) {
//                        var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
//                        currentlyPlayingCell.html(currentlyPlayingSongNumber);
//                    }
//
//                    if (currentlyPlayingSongNumber !== songNumber) {
//                        $(this).html(pauseButtonTemplate);
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
//                            $(this).html(pauseButtonTemplate);
//                            $playPauseButton.html(playerBarPauseButton);
//                            currentSoundFile.play();
//
//                            updateSeekBarWhileSongPlays();
//                        } else {
//                            $(this).html(playButtonTemplate);
//                            $('.left-controls.play-pause').html(playerBarPlayButton);
//                            currentSoundFile.pause();
//
//                            $playPauseButton.html(playerBarPlayButton);
//                        }
//                    }
//
//                };
//
//                var onHover = function() {
//                    var songNumberCell = $(this).find('.song-item-number');
//                    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
//
//                    if (songNumber !== currentlyPlayingSongNumber) {
//                        songNumberCell.html(playButtonTemplate);
//                    }
//                };
//
//                var offHover = function() {
//                    var songNumberCell = $(this).find('.song-item-number');
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
//                var $albumTitle = $('.album-view-title');
//                var $albumArtist = $('.album-view-artist');
//                var $albumReleaseInfo = $('.album-view-release-info');
//                var $albumImage = $('.album-cover-art');
//                var $albumSongList = $('.album-view-song-list');
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
//                var curTime = $('.current-time').html(filterTimeCode(currentTime));
//            };
//
//            var setTotalTimeInPlayerBar = function() {
//                var totTime = $('.total-time').html(filterTimeCode(currentSongDuration));
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
//                        var $seekBar = $('.seek-control .seek-bar');
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
//                var $seekBars = $('.player-bar .seek-bar');
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
//                    var offsetX = event.pageX - $(this).offset().left;
//                    var barWidth = $(this).width();
//                    var seekBarFillRatio = offsetX / barWidth;
//
//                    if ($(this).parent().attr('class') == 'seek-control') {
//                        seek(seekBarFillRatio * currentSoundFile.getDuration());
//                    } else {
//                        setVolume(seekBarFillRatio * 100);
//                    }
//
//                    updateSeekPercentage($(this), seekBarFillRatio);
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
//                    var $seekBar = $(this).parent();
//
//                    $(document).bind('mousemove.thumb', function(event){
//                        var offsetX = event.pageX - $seekBar.offset().left;
//                        var barWidth = $seekBar.width();
//                        var seekBarFillRatio = offsetX / barWidth;
//
//                        if ($(this).parent().attr('class') == 'seek-control') {
//                            seek(seekBarFillRatio * currentSoundFile.getDuration());
//                        } else {
//                            setVolume(seekBarFillRatio * 100);
//                        }
//
//                        updateSeekPercentage($seekBar, seekBarFillRatio);
//                    });
//
//                    $(document).bind('mouseup.thumb', function() {
//                        $(document).unbind('mousemove.thumb');
//                        $(document).unbind('mouseup.thumb');
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
//                        $('.album-song-button').html(playButtonTemplate);
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
//                $('.currently-playing .song-name').text(currentSongFromAlbum.name);
//                $('.currently-playing .artist-name').text(currentAlbum.artist);
//                $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
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
//                return $('.song-item-number[data-song-number="' + number + '"]');
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
//            var $playPauseButton = $('.left-controls .play-pause');
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
//            var volumeFill = $(".volume .fill");
//            var volumeThumb = $(".volume .thumb");
//            volumeFill.width(currentVolume + '%');
//            volumeThumb.css({left: currentVolume + '%'});
//            var fillStart = $(".seek-control .fill");
//            fillStart.width(0);
//
//            var $previousButton = $('.left-controls .previous');
//            var $nextButton = $('.left-controls .next');
//
//            $(document).ready(function() {
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
//
//        });
}]);