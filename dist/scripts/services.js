var jamsServices = angular.module("services", [])

    .value("valueName", "value")
    .factory("factoryName", ["dependency", function (dependency) {
        // Logic here
    }])
    .service("serviceName", ["dependency", Object])

    .service("albumsService", ["$http", function ($http) {
        "use strict";

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

        //this.collection = $http.get("/data/albums.json");

        var model = this;

        model.collection = $http.get("/data/albums.json");

        model.getCollection = function() {
            return model.collection;
        };

        model.getAlbumAt = function(_id) {
            model.getCollection();
            return filterFilter(model.collection, {
                id: _id
            })[0];
        };

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