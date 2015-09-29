//noinspection JSLint
angular.module("blocJams")

    .service("albumsService", ["$http", "$q", function ($http, $q) {
        "use strict";
        var albums = this;
        var deferred = $q.defer();

        // do your get
        $http.get("/data/albums.json").then(function (data) {
            console.log("Made it this far.");
            deferred.resolve(data);
        });

        this.getAllAlbums = function () {
            return deferred.promise;
        };

        var promise = this.getAllAlbums();

        var allAlbums =
            promise.then(function (data) {
                albums.collection = data;
                console.log(albums.collection.data);
                return albums.collection.data;
            });

        console.log(allAlbums);

        //return {
        //    getAlbumByIndex: function (index) {
        //
        //        return albums[index];
        //    },
        //    getAllAlbums: function () {
        //        return albums;
        //    }
        //};

    }])

    .controller('AlbumController2', ["$scope", "$stateParams", "albumsService", function ($scope, $stateParams, albumsService) {
        "use strict";

        var promise = albumsService.getAllAlbums();

        promise.then(function (data) {
            $scope.collection = data;
            console.log($scope.collection.data);
        });

        //$scope.currentAlbum = albums.getAlbumByIndex($stateParams.albumIndex);

        //noinspection JSLint
        var $j = jQuery.noConflict();

        $j(function () {
            console.log("jQuery ready function");
        });

    }]);
