"use strict";
define([
    './renderers/census_renderer',
    './renderers/license_food_renderer',
    './renderers/license_liquor_renderer',
    './renderers/license_entertainment_renderer'
], function (
) {
    var renderers = {};

    for (var i = 0; i < arguments.length; i++) {
        console.log('adding renderer with name: ' + arguments[i].name);
        renderers[arguments[i].name] = arguments[i].renderer;
    }

    return {
        getRenderer: function (name) {
            return renderers[name];
        }
    };
});