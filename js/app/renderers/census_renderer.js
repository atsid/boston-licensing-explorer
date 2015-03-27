"use strict";
define([
    'module'
], function (
    module
) {
    var config = module.config(),
        findIncomeBin = function (income) {
            var index = income_bins.length - 1;
            income_bins.some(function (bin, idx) {
                if (income < bin) {
                    index = idx;
                    return true;
                }
            });
            return index;
        },
        colors = config.colors,
        income_bins = config.income_bins;

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
            key: 'ALAND',
            label: 'Area (m<sup>2</sup>)'
        }, {
            key: 'GEOID',
            label: 'GEOID'
        }],
        name: 'layer_census'
    };
});
