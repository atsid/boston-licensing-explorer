"use strict";
define([
    './renderers/census_renderer',
    './renderers/license_food_renderer',
    './renderers/license_liquor_renderer',
    './renderers/license_entertainment_renderer'
], function (
) {
    var renderers = {},
        attributeTableConfigs = {};

    for (var i = 0; i < arguments.length; i++) {
        renderers[arguments[i].name] = arguments[i].renderer;
        attributeTableConfigs[arguments[i].name] = arguments[i].attributeTableConfig;
    }

    return {
        getRenderer: function (name) {
            return renderers[name];
        },
        getAttributeTableConfig: function (name) {
            return attributeTableConfigs[name];
        }
    };
});