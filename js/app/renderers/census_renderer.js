"use strict";
define([
    'module',
    '../map',
    '../widget/Legend'
], function (
    module,
    map,
    Legend
) {
    var config = module.config(),
        currentAttribute = 'INCOME',
        colors = config.attributes[currentAttribute].colors,
        labels = config.attributes[currentAttribute].labels,
        bins = config.attributes[currentAttribute].bins;

    function findBin(bins, value) {
        var index = bins.length - 1;
        bins.some(function (bin, idx) {
            if (value < bin) {
                index = idx;
                return true;
            }
        });
        return index;
    }

    return {

        name: 'census_geography',

        setAttribute: function (attribute) {
            currentAttribute = attribute;
            colors = config.attributes[currentAttribute].colors;
            labels = config.attributes[currentAttribute].labels;
            bins = config.attributes[currentAttribute].bins;
        },

        renderer: function (feature) {
            var selected = feature.getProperty('selected'),
                hovered = feature.getProperty('hovered'),
                value = feature.getProperty(currentAttribute),
                bin = findBin(bins, value),
                color = colors[bin] || '#999';

            return ({
                fillOpacity: 0.6,
                fillColor: color,
                strokeColor: (selected || hovered) ? '#136EFB' : '#444',
                strokeWeight: selected ? 4 : hovered ? 2 : 1,
                zIndex: selected ? 2 : hovered ? 1 : 0
            });
        },

        attributeTableConfig: [{
            label: 'Type ',
            value: 'Census Tract'
        }, {
            key: 'INCOME',
            label: 'Median Income',
            formatter: function (data) {
                return '$' + (data || '0');
            }
        }, {
            key: 'POP',
            label: 'Population'
        }, {
            key: 'DENSITY',
            label: 'Pop. Density'
        }, {
            key: 'SQ_MILE',
            label: 'Area (mi<sup>2</sup>)'
        }, {
            key: 'GEOID',
            label: 'GEOID'
        }],

        getLegend: function () {
            return new Legend(colors, labels);
        }

    };
});
