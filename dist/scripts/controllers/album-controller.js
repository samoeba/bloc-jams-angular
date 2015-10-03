//noinspection JSLint
angular.module("blocJams")

    .service("albumsService", ["$http", "$q", function ($http, $q) {
        "use strict";

        //thisService.albums = $http.get("/data/albums.json");
        var deferred, thisService;

        thisService = this;
        deferred = $q.defer();

        $http.get('/data/albums.json').then(function(data) {
            deferred.resolve(data);
        });
        this.getAlbums = function(){
            return deferred.promise;
        };

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

    .controller('AlbumController', ["$scope", "$stateParams", "albumsService", function ($scope, $stateParams, albumsService) {
        "use strict";

        var getAlbumByIndex = function (index) {
            return thisService.getAlbums[index];
        };

        var promise = albumsService.getAlbums();
        promise.then(function (response) {
            $scope.collection = response.data;
            console.log($scope.collection);
        });

        console.log($scope.collection);

        //albumsService.allAlbums.then(function (albums) {
        //    $scope.collection = albums.data;
        //    console.log("test");
        //});

        //$scope.currentAlbum = albumsService.albums.getAlbumByIndex($stateParams.albumIndex);

        //console.log(albumsService.albums);


        //noinspection JSLint
        var $j = jQuery.noConflict();

        $j(function () {
            console.log("jQuery ready function");
        });

    }]);
