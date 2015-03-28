"use strict";

define([
    'module',
    'jquery',
    './fields',
    './map',
    './widget/Table',
    './layers'
], function (
    module,
    jQuery,
    fields,
    map,
    Table,
    layers
) {

    var config = module.config(),
        opts = config.opts;

    var applyBindings = function (geodata, censusdata, renderer) {
        var d = map.data;

        d.setStyle(renderer);

        function click() {
            var previous;
            return function (event) {
                var feature = event.feature,
                    id = feature.getId(),
                    selected = feature.getProperty('selected');
                console.log(id + ' clicked');
                console.log(feature);
                if (previous) {
                    d.getFeatureById(previous).setProperty('selected', false);
                }
                previous = id;
                feature.setProperty('selected', !selected);
            };
        }

        function getAttributeTableConfig(feature) {
            var layerName = feature.getProperty('layer');

            if (layerName) {
                return layers.getAttributeTableConfig(layerName);
            } else {
                return layers.getAttributeTableConfig('census_geography');
            }
        }

        function mouseover() {
            var previous;
            return function (event) {
                var feature = event.feature,
                    id = feature.getId();

                new Table(feature, getAttributeTableConfig).renderTo('#feature-details');

                if (previous) {
                    d.getFeatureById(previous).setProperty('hovered', false);
                }
                previous = id;
                feature.setProperty('hovered', true);
            };
        }

        d.addListener('click', click().bind(this));
        d.addListener('mouseover', mouseover().bind(this));

        //map our data hash values into the features
        d.forEach(function (feature) {
            var id = feature.getId();
            fields.forEach(function (field) {
                var result;
                if (field.key) {
                    result = parseInt(censusdata[id][field.key]);
                } else if (field.calc) {
                    result = field.calc.call(field, feature);
                }
                feature.setProperty(field.field, result);
            });
        });

    };
    
    return {

        renderer: function (feature) {
            var layer_name = feature.getProperty('layer'),
                renderer;

            if (layer_name) {
                renderer = layers.getRenderer(layer_name);
            }

            if (renderer) {
                return renderer(feature);
            } else {
                return layers.getRenderer('census_geography')(feature);
            }
        },

        load: function (censusdata, callback) {
            var cb = function (geodata) {
                    applyBindings(geodata, censusdata, this.renderer);
                    if (callback) {
                        callback.call(this);
                    }
                }.bind(this);

            layers.displayLayer('census_geography', opts, cb);
        }
    };

});
