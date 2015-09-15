(function () {
    "use strict";
    var flatlandersStoreMod = angular.module('flatlandersStore', []);
    var gems = [
        {
            name: "Dodecahedron",
            price: 2.95,
            description: ". . .",
            canPurchase: true,
        },
        {
            name: "Pentagonal Gem",
            price: 5.95,
            description: ". . .",
            canPurchase: false,
        }
    ];
    flatlandersStoreMod.controller('StoreController', function () {
        this.products = gems;
    });
}());

