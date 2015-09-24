angular.module('blocJams')

.controller('CollectionController', ['$scope', '$http', function ($scope, $http) {
    $http({ method: 'GET', url: '/albums.json' }).success(function (data) {
        $scope.collection = data;
    });
}]);