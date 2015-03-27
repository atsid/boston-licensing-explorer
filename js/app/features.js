"use strict";

define([
    'module',
    'jquery',
    './fields',
    './map',
    './Table',
    './renderer',
    './layers'
], function (
    module,
    jQuery,
    fields,
    map,
    Table,
    renderers,
    layers
) {

    var config = module.config(),
        opts = config.opts,
        attributeTableConfig = [{
            key: 'INCOME',
            label: 'Median Income',
            formatter: function (data) {
                return '$' + (data || '0');
            }
        }, {
            key: 'POP',
            label: 'Population'
        }, {
            key: 'ALAND',
            label: 'Area (m<sup>2</sup>)'
        }, {
            key: 'GEOID',
            label: 'GEOID'
        }];

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

        function mouseover() {
            var previous;
            return function (event) {
                var feature = event.feature,
                    id = feature.getId();

                new Table(feature, attributeTableConfig).renderTo('#feature-details');

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
                feature.setProperty(field.field, censusdata[id][field.key]);
            });
        });
    };
    
    return {

        renderer: function (feature) {
            var layer_name = feature.getProperty('layer'),
                renderer;

            if (layer_name) {
                renderer = renderers.getRenderer(layer_name);
            }

            if (renderer) {
                return renderer(feature);
            } else {
                return renderers.getRenderer('layer_census')(feature);
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
