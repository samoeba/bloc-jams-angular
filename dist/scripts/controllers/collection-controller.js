angular.module('blocJams')

.controller('CollectionController', ["$scope", "GetAlbum", function ($scope, GetAlbum) {

    GetAlbum.collection.then(function (albums) {
        $scope.collection = albums.data;
    });

}]);
