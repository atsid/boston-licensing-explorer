"use strict";

//loads a google api map and makes it available to other modules via amd
define([
    'module',
    'jquery'
], function (
    module,
    jQuery
) {

    var config = module.config(),
        map = new google.maps.Map(jQuery(config.element)[0], config.map);

    return map;

});