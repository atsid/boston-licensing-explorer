"use strict";

define([
    'module',
    'jquery',
    './fields',
    './map',
    './Table'
], function (
    module,
    jQuery,
    fields,
    map,
    Table
) {

    var config = module.config(),
        colors = config.colors,
        income_bins = config.income_bins,
        opts = config.opts,
        attributeTableConfig = [{
            key: 'GEOID',
            label: 'GEOID'
        }, {
            key: 'ALAND',
            label: 'Area (m<sup>2</sup>)'
        }, {
            key: 'INCOME',
            label: 'Median Income',
            formatter: function (data) {
                return '$' + (data || '0');
            }
        }, {
            key: 'POP',
            label: 'Population'
        }];

    var findIncomeBin = function (income) {
        var index = income_bins.length - 1;
        income_bins.some(function (bin, idx) {
            if (income < bin) {
                index = idx;
                return true;
            }
        });
        return index;
    };
    
    return {

        renderer: function (feature) {
            var selected = feature.getProperty('selected'),
                hovered = feature.getProperty('hovered'),
                income = feature.getProperty('INCOME'),
                bin = findIncomeBin(income),
                color = colors[bin] || '#999';

            return ({
                fillOpacity: (selected || hovered) ? 0.8 : 0.6,
                fillColor: color,
                strokeColor: (selected || hovered) ? '#136EFB' : '#444',
                strokeWeight: selected ? 4 : hovered ? 2 : 1,
                zIndex: selected ? 2 : hovered ? 1 : 0
            });

        },

        load: function (url, data, callback) {

            map.data.loadGeoJson(url, opts, function () {

                var d = map.data;

                d.setStyle(this.renderer);

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
                    var id = feature.getId(),
                        d = data[id];
                    fields.forEach(function (field) {
                        feature.setProperty(field.field, d[field.key]);
                    });
                });

                if (callback) {
                    callback.call(this);
                }

            }.bind(this));

        }

    };

});
