angular.module('blocJams')

.controller('CollectionController', ['$scope', '$http', function ($scope, $http) {
    $http({ method: 'GET', url: '/data/albums.json' }).success(function (data) {
        console.log("Made it this far.");
        $scope.collection = data;
    });
}]);
