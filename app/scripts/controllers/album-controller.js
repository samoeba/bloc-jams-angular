//noinspection JSLint
angular.module("blocJams")

    .controller('AlbumController', ["$scope", "albumsService", "$stateParams", function ($scope, albumsService, $stateParams) {
        "use strict";

        //albumsService.getCollection()
        //    .then(function(result){
        //        $scope.collection = result[0];
        //    });


        albumsService.collection.then(function (albums) {
            //$scope.album = albumsService.getAlbumAt($stateParams.albumId);
            $scope.album = albums.data[0];
            console.log("test");
        });


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
