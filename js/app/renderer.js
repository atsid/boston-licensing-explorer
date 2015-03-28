"use strict";
define([
    './layers/census_geography',
    './layers/license_food',
    './layers/license_liquor',
    './layers/license_entertainment'
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
            var legend = renderers[name].getLegend;
            return legend && legend();
        }
    };
});