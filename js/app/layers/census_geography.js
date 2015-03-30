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
                labels: ['&lt;$45,000', '$45,000 - $65,000', '$65,000 - $90,000', '$90,000 - $115,000', '$115,000 - $150,000', '&gt;$150,000'],
                bins: [45000, 65000, 90000, 115000, 150000, 500000]
            },
            DENSITY: {
                //http://www.colourlovers.com/palette/114453/another_pearl
                colors: ['#DEEDF6', '#CFD6DB', '#C1BFC0', '#B2A8A4', '#A39189', '#766158'],
                labels: ['&lt;5,000', '5,000 - 10,000', '10,000 - 20,000', '20,000 - 40,000', '40,000 - 80,000', '&gt;80,000'],
                bins: [5000, 10000, 20000, 40000, 80000, 500000]
            },
            PERSON_FOOD: {
                //http://www.colourlovers.com/palette/16580/%3C3_peachbelle
                colors: ['#EDAFAA', '#E39295', '#DA7487', '#A6487A', '#732759', '#590447', '#999'],
                labels: ['&lt;250', '250 - 500', '500 - 1,000', '1,000 - 2,500', '2,500 - 5,000', '&gt;5,000', 'No Data or 0 Licenses'],
                bins: [250, 500, 1000, 2500, 5000, 10000]
            },
            PERSON_LIQUOR: {
                //http://www.colourlovers.com/palette/16580/%3C3_peachbelle
                colors: ['#EDAFAA', '#E39295', '#DA7487', '#A6487A', '#732759', '#590447', '#999'],
                labels: ['&lt;250', '250 - 500', '500 - 1,000', '1,000 - 2,500', '2,500 - 5,000', '&gt;5,000', 'No Data or 0 Licenses'],
                bins: [250, 500, 1000, 2500, 5000, 10000]
            },
            PERSON_ENT: {
                //http://www.colourlovers.com/palette/16580/%3C3_peachbelle
                colors: ['#EDAFAA', '#E39295', '#DA7487', '#A6487A', '#732759', '#590447', '#999'],
                labels: ['&lt;100', '100 - 250', '250 - 500', '500 - 1,000', '1,000 - 2,500', '&gt;2,500', 'No Data or 0 Licenses'],
                bins: [100, 250, 500, 1000, 2500, 10000]
            },
            NONE: {
                colors: [],
                labels: [],
                bins: []
            }
        };

    function findBin(bins, value) {
        var index = bins.length - 1;
        if (typeof value !== 'number') {
            return bins.length; //extra 'no data' color at the end of each
        }
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
                fillOpacity: (attribute === 'NONE') ? 0.0 : 0.6,
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
            label: 'Land Area (mi<sup>2</sup>)'
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
            key: 'PERSON_FOOD',
            label: 'Persons / Food Lic.'
        }, {
            key: 'PERSON_ENT',
            label: 'Persons / Entertainment Lic.'
        }, {
            key: 'PERSON_LIQUOR',
            label: 'Persons / Liquor Lic.'
        }],

        getLegend: function () {
            var colors = attributes[attribute].colors,
                labels = attributes[attribute].labels;
            return new Legend(colors, labels);
        }

    };
});
