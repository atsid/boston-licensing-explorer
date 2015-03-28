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
        renderers[arguments[i].name] = arguments[i];
    }

    return {
        getRenderer: function (name) {
            return renderers[name].renderer;
        },
        setRendered: function (name, attribute) {
            renderers[name].setAttribute(attribute);
        },
        getAttributeTableConfig: function (name) {
            return renderers[name].attributeTableConfig;
        },
        getLegend: function (name) {
            return renderers[name].getLegend();
        }
    };
});