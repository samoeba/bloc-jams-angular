angular.module("services")

    .factory("SongInfo", ["$stateParams", "GetAlbum", function ($stateParams, GetAlbum) {
    "use strict";

        var collection = GetAlbum.collection;

        return {
            currentAlbum: null,
            currentAlbumDeferred: null,
            //currentAlbum: null,
            currentlyPlayingSongNumber: null,
            currentSongFromAlbum: null,
            isPlaying: false,
            currentSoundFile: null,
            currentSoundFileDeferred: null,
            //currentSongDurations: [],
            //currentSongDuration: null,
            currentVolume: 10
        };
    }]);
