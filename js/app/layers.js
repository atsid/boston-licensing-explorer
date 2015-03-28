"use strict";

define([
    'module',
    'jquery',
    './map',
    './layer_config',
    './widget/status'
], function (
    module,
    jQuery,
    map,
    layer_config,
    status
) {

    var layers = {},
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

            status.show('Loading layer [' + name + ']...');

            jQuery.ajax({
                'async' : true,
                'global' : false,
                'url' : url,
                'dataType': 'json',
                'success': function (data) {

                    features = map.data.addGeoJson(data, options || {});
                    addFeaturesAsLayers(name, features);

                    status.hide();

                    if (callback) {
                        callback(data);
                    }
                }
            });
        },

        //creates a fusion layer, mapping into the config by name
        createLayer: function (name, options, callback) {
            this.addLayer(layer_config[name].url, name, options, callback);
        },

        //displays a specified layer
        displayLayer: function (name, options, callback) {
            var layer = layers[name];

            if (!layer) {
                this.createLayer(name, options, callback);
            } else {
                toggleHidden(name, options);
            }

            var legend = this.getLegend(name);
            if (legend) {
                legend.renderTo('#legend');
            }
        },

        //change the rendered data within a layer
        //only really applies to the census right now,
        //since everything else is point data
        changeData: function (name, attribute) {
            layer_config[name].setAttribute(attribute);
            var legend = this.getLegend(name);
            if (legend) {
                legend.renderTo('#legend');
            }
            //toggling on and off seems to be the only way to force a redraw with the new data
            toggleHidden(name);
            toggleHidden(name);
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
            return layer_config[name].renderer;
        },

        getAttributeTableConfig: function (name) {
            return layer_config[name].attributeTableConfig;
        },

        getLegend: function (name) {
            var legend = layer_config[name].getLegend;
            return legend && legend();
        }

    };

});
