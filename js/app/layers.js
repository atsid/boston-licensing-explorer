"use strict";

define([
    'module',
    'jquery',
    './map',
    './renderer'
], function (
    module,
    jQuery,
    map,
    renderer
) {

    var config = module.config,
        baseUrl = 'data/',
        layers = {},
        tables = {
            'license_liquor' : {
                type: 'geojson',
                field: 'address',
                url: baseUrl + 'liquor.geojson',
                template: 2,
                style: 2
            },
            'license_food': {
                type: 'geojson',
                field: 'address',
                url: baseUrl + 'food.geojson',
                template: 1,
                style: 1
            },
            'license_entertainment': {
                type: 'geojson',
                field: 'address',
                url: baseUrl + 'entertainment.geojson',
                template: 3,
                style: 3
            },
            'census_geography': {
                type: 'geojson',
                url: baseUrl + 'cb_2013_25_tract_500k.geojson'
            }
        },
        addFeaturesAsLayers = function (key, features) {
            layers[key] = features;
            layers['hidden_' + key] = false;
        },
        toggleHidden = function (name) {
            var hidden = layers['hidden_' + name],
                i = 0;
            if (hidden) {
                layers['hidden_' + name] = false;
                for (i = 0; i < layers[name].length; i++) {
                    map.data.add(layers[name][i]);
                }
            } else {
                layers['hidden_' + name] = true;
                for (i = 0; i < layers[name].length; i++) {
                    map.data.remove(layers[name][i]);
                }
            }
        };

    return {

        addLayer: function (url, name, options, callback) {
            var features;

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
                                features = map.data.addGeoJson(data, options || {});
                                addFeaturesAsLayers(name, features);
                            }
                        });
                    } else {
                        features = map.data.addGeoJson(data, options || {});
                        addFeaturesAsLayers(name, features);
                    }

                    if (callback) {
                        callback(data);
                    }
                }
            });
        },

        //creates a fusion layer, mapping into the config by name
        createLayer: function (name, options, callback) {
            var table = tables[name];

            if (table.type === 'geojson') {
                this.addLayer(table.url, name, options, callback);
            }
        },

        //displays a specified layer
        displayLayer: function (name, options, callback) {
            var layer = layers[name];

            if (!layer) {
                this.createLayer(name, options, callback);
            } else {
                toggleHidden(name, options);
            }
        },

        getLayer: function (name, callback) {
            var layer = layers[name];

            if (!layer) {
                this.createLayer(name, callback);
            } else {
                callback(layer);
            }
        },

        getRenderer: function (name) {
            return renderer.getRenderer(name);
        },

        getAttributeTableConfig: function (name) {
            return renderer.getAttributeTableConfig(name);
        }

    };

});
