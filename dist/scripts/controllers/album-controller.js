//noinspection JSLint
angular.module("blocJams")

    .controller('AlbumController', ["$scope", "$stateParams", "albumsService", function ($scope, $stateParams, albumsService) {
        "use strict";

        albumsService.collection.then(function (albums) {
            //$scope.album = albumsService.getAlbumAt($stateParams.albumId);
            //$scope.album = albums.data[$stateParams.id];
            $scope.collection = albums.data;
            console.log($scope.album);
            $scope.album = albums.data[albumsService.getAlbumById($scope.collection, "aid", $stateParams.id)];
        });

        //=====================================================================

        //albumsService.collection.then(function (albums) {
        //    //$scope.album = albumsService.getAlbumAt($stateParams.albumId);
        //    //$scope.album = albums.data[$stateParams.id];
        //    $scope.album = albums.data;
        //    console.log("test");
        //    //var testy = $scope.album;
        //    console.log($scope.album);
        //}).then(function (albums) {
        //    $scope.album = albums.data[albumsService.getAlbumById($scope.album, id, $stateParams.id)];
        //    console.log($scope.album);
        //});

        //=====================================================================

        //albumsService.getCollection()
        //    .then(function(result){
        //        $scope.collection = result[0];
        //    });

        //=====================================================================

        //$scope.getCollection = function () {
        //    albumsService.getCollection()
        //        .then(function (response) {
        //            $scope.album = albumsService.collection[0];
        //            console.log($scope.album);
        //        });
        //    //albumsService.getAlbumAt()
        //    //    .then(function (response) {
        //    //        console.log($scope.album);
        //    //    });
        //};
        //
        //$scope.getCollection();
        //
        //$scope.currentAlbumId = $stateParams.albumId;


        //=====================================================================

        //$scope.collection = $stateParams.album;

        //$scope.currentAlbum = albumsService.albums.getAlbumByIndex($stateParams.albumIndex);

        //console.log(collection);

        //var getAlbumByIndex = function (index) {
        //    return thisService.getAlbums[index];
        //};

        //var promise = albumsService.getAlbums();
        //promise.then(function (response) {
        //    $scope.collection = response.data;
        //    console.log($scope.collection);
        //});
        //
        //console.log($scope.collection);

        //console.log(albumsService.albums);


        //noinspection JSLint
        //var $j = jQuery.noConflict();
        //
        //$j(function () {
        //    console.log("jQuery ready function");
        //});

    }]);
