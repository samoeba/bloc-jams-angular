var blocJams = angular.module("services", []);

    blocJams.value("valueName", "value");
    blocJams.factory("factoryName", ["dependency", function (dependency) {
        // Logic here
    }]);
    blocJams.service("serviceName", ["dependency", Object]);

    blocJams.factory("songPlayer", ["dependency", function (dependency) {

        var currentSoundFile = null;

    }]);