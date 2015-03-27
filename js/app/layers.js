"use strict";

define([
    'module',
    'jquery',
    './map'
], function (
    module,
    jQuery,
    map
) {

    var config = module.config,
        baseUrl = 'http://labs.atsid.com/hubhacks2/',
        layers = {},
        tables = {
            'license_liquor' : {
                type: 'geojson',
                field: 'address',
                url: baseUrl + 'data/liquor.geojson',
                template: 2,
                style: 2
            },
            'license_food': {
                type: 'geojson',
                field: 'address',
                url: baseUrl + 'data/food.geojson',
                template: 1,
                style: 1
            },
            'license_entertainment': {
                type: 'geojson',
                field: 'address',
                url: baseUrl + 'data/entertainment.geojson',
                template: 3,
                style: 3
            }
        },
        addFeaturesAsLayers = function (key, features) {
            layers[key] = features;
        };

    return {

        addLayer: function (url, name, callback) {
            jQuery.ajax({
                'async' : true,
                'global' : false,
                'url' : url,
                'dataType': 'json',
                'success': function (data) {
                    if (config.validate) {
                        jQuery.ajax({
                            url: 'http://geojsonlint.com/validate',
                            type: 'POST',
                            data: data,
                            dataType: 'json',
                            success: function (done) {
                                var features = map.data.addGeoJson(data);
                                if (callback) {
                                    callback(name, features);
                                }
                            }
                        });
                    } else {
                        var features = map.data.addGeoJson(data);
                        if (callback) {
                            callback(name, features);
                        }
                    }
                }
            });
        },

        //creates a fusion layer, mapping into the config by name
        createLayer: function (name) {
            var table = tables[name];

            if (table.type === 'geojson') {
                this.addLayer(table.url, name, addFeaturesAsLayers);
            }
        },

        //displays a specified layer
        displayLayer: function (name) {
            var layer = layers[name];

            if (!layer) {
                this.createLayer(name);
            } else {

            }
        }

    };

});
