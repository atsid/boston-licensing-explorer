"use strict";
define([
    './layers/census_geography',
    './layers/license_food',
    './layers/license_liquor',
    './layers/license_entertainment'
], function () {
    var layers = {};

    for (var i = 0; i < arguments.length; i++) {
        layers[arguments[i].name] = arguments[i];
    }

    return layers;
});