"use strict";
define([
    'module',
    '../Legend'
], function (
    module,
    Legend
) {
    var config = module.config(),
        colors = config.colors,
        income_labels = config.income_labels,
        income_bins = config.income_bins,
        legend;

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

    legend = new Legend(colors, income_labels);

    return {

        name: 'census_geography',

        renderer: function (feature) {
            var selected = feature.getProperty('selected'),
                hovered = feature.getProperty('hovered'),
                income = feature.getProperty('INCOME'),
                bin = findBin(income_bins, income),
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

        legend: legend
    };
});
