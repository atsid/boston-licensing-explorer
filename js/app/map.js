//loads a google api map and makes it available to other modules via amd
define([
    'module'
], function (
    module
) {

    var config = module.config(),
        map = new google.maps.Map(document.getElementById(config.element), config.map);

    return map;

});