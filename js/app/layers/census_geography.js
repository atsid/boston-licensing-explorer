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
    var attribute = 'INCOME',
        attributes = {
            INCOME: {
                //http://www.colourlovers.com/palette/84571/echo
                colors: ['#D8A97B', '#BC9E78', '#9F9275', '#828571', '#65796D', '#4F5C4B'],
                labels: ['&lt;$43,000', '$43,000 - $67,000', '$67,000 - $88,000', '$88,000 - $113,000', '$113,000 - $151,000', '&gt;$151,000'],
                bins: [43000, 67000, 88000, 113000, 151000, 500000]
            },
            DENSITY: {
                //http://www.colourlovers.com/palette/114453/another_pearl
                colors: ['#766158', '#A39189', '#B2A8A4', '#C1BFC0', '#CFD6DB', '#DEEDF6'],
                labels: ['&lt;7,500', '7,500 - 17,000', '17,000 - 29,000', '29,000 - 43,000', '43,000 - 85,000', '&gt;85,000'],
                bins: [7500, 17000, 29000, 43000, 85000, 500000]
            }
        };

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

        url: module.config().url,
        type: 'polygons',

        setAttribute: function (attr) {
            attribute = attr;
        },

        renderer: function (feature) {
            var selected = feature.getProperty('selected'),
                hovered = feature.getProperty('hovered'),
                value = feature.getProperty(attribute),
                colors = attributes[attribute].colors,
                bins = attributes[attribute].bins,
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
            key: 'license_food_count',
            label: 'Food Licenses'
        }, {
            key: 'license_entertainment_count',
            label: 'Entertainment Licenses'
        }, {
            key: 'license_liquor_count',
            label: 'Liquor Licenses'
        }, {
            key: 'GEOID',
            label: 'GEOID'
        }],

        getLegend: function () {
            var colors = attributes[attribute].colors,
                labels = attributes[attribute].labels;
            return new Legend(colors, labels);
        }

    };
});
