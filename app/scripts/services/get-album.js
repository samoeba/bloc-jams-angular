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

    }]);