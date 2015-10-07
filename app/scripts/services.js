var jamsServices = angular.module("services", [])

    .value("valueName", "value")
    .factory("factoryName", ["dependency", function (dependency) {
        // Logic here
    }])
    .service("serviceName", ["dependency", Object])

    .service("albumsService", ["$http", function ($http) {
        "use strict";

        var albumsService = this, i;

        albumsService.collection = $http.get("/data/albums.json");

        return {

            collection: albumsService.collection,
            getAlbumById: function (data, prop, value) {
                for (i = 0; i < data.length; i++) {
                    if (data[i][prop] == value) {
                        return i;
                    }
                }
            }
        };

        //return albumsService;

        //albumsService.getAlbumById = function (id) {
        //    for (i = 0, i < albumsService.collection.length, i++) {
        //
        //    }
        //};

        //==============================================================

        //var albumsService = this,
        //    deferred,
        //    ALBUMS_DATA = "/data/albums.json";
        //albumsService.collection = {};
        //
        //albumsService.getCollection = function () {
        //    deferred = $q.defer();
        //
        //    $http.get(ALBUMS_DATA)
        //        .success(function (response) {
        //            albumsService.collection = response;
        //            deferred.resolve(response);
        //        });
        //
        //    return deferred.promise;
        //
        //};
        //
        //albumsService.getAlbumAt = function(_id) {
        //    albumsService.getCollection();
        //    return filterFilter(albumsService.getCollection(), {
        //        id: _id
        //    })[0];
        //};
        //
        //return albumsService;


        //==============================================================

        //var model = this,
        //    URLS = {
        //        FETCH: "/data/albums.json"
        //    },
        //    collection;
        //
        //function extract(result) {
        //    return result.data;
        //}
        //
        //function cacheCollection(result) {
        //    collection = extract(result);
        //    return collection;
        //}
        //
        //model.getCollection = function() {
        //    return $http.get(URLS.FETCH).then(cacheCollection);
        //};

        //==============================================================

        //var model = this;
        //
        //model.collection = $http.get("/data/albums.json");
        //
        //model.getCollection = function() {
        //    return model.collection;
        //};
        //
        //model.getAlbumAt = function(_id) {
        //    model.getCollection();
        //    return filterFilter(model.collection, {
        //        id: _id
        //    })[0];
        //};

        //===============================================================

        //var deferred, thisService;
        //
        //thisService = this;
        //deferred = $q.defer();
        //
        //$http.get('/data/albums.json').then(function(data) {
        //    deferred.resolve(data);
        //});
        //this.getAlbums = function(){
        //    return deferred.promise;
        //};

        //var thisService, collection;
        //
        //thisService = this;
        //collection = {
        //    albums: null
        //};

        //$http.get("/data/albums.json").then(function (response) {
        //    collection.albums = response.data;
        //});
        //
        //return collection;

        //return {
        //
        //    allAlbums: thisService.albums,
        //    getAlbumByIndex: function (index) {
        //        return thisService.albums[index];
        //    }
        //
        //};

    }])

    .factory("songPlayer", ["dependency", function (dependency) {

        var currentSoundFile = null;

    }]);