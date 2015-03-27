"use strict";
define([
    './renderers/census_renderer'
], function (
) {
    var renderers = {};

    for(var i = 0; i < arguments.length; i++) {
        renderers[arguments[i].name] = arguments[i].renderer;
    }

    return {
        getRenderer: function (name) {
            console.log('getting renderer for ' + name);
            return renderers[name];
        }
    };
});