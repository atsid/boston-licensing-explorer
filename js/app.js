"use strict";

var baseDataUrl = window.location.hostname === 'localhost' ? 'data/' : 'http://labs.atsid.com/hubhacks2/data/';

requirejs.config({
    'baseUrl': 'js/lib',
    'paths': {
        'app': '../app',
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'jqueryui': 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min'
    },
    'config': {
        'app/main': {
            census_url: 'http://api.census.gov/data/2013/acs5?get=B19013_001E,B01003_001E&for=tract:*&in=state:25+county:*'
        },
        'app/map': {
            //starting zoom and map centering options
            map: {
                center: { lat: 42.3601, lng: -71.0589 },
                zoom: 12
            },
            element: '#map-canvas'
        },
        'app/renderers/census_renderer': {
            attributes: {
                INCOME: {
                    //http://www.colourlovers.com/palette/84571/echo
                    colors: ['#D8A97B', '#BC9E78', '#9F9275', '#828571', '#65796D', '#4F5C4B'],
                    labels: ['&lt;$20,000', '$20,000 - $60,000', '$60,000 - $80,000', '$80,000 - $100,000', '$100,000 - $150,000', '&gt;$150,000'],
                    //this is pretty arbitrary, but ramps up to capture a little more granularity in the more common < 100k bins
                    bins: [20000, 60000, 80000, 100000, 150000, 500000]
                },
                DENSITY: {
                    //http://www.colourlovers.com/palette/114453/another_pearl
                    colors: ['#A39189', '#B2A8A4', '#C1BFC0', '#CFD6DB', '#DEEDF6', '#4F5C4B'],
                    labels: ['&lt;6,500', '6,500 - 16,500', '16,500 - 32,000', '32,000 - 65,000', '65,000 - 110,000', '&gt;110,000'],
                    //this is pretty arbitrary, but ramps up to capture a little more granularity in the more common < 100k bins
                    bins: [6500, 16500, 32000, 65000, 110000, 500000]
                }
            }
        },
        'app/features': {
            //these are the geojson opts used for maps api loadGeoJson
            opts: { idPropertyName: 'GEOID' }
        },
        //field codes documented here: http://www2.census.gov/geo/tiger/TIGER_DP/2013ACS/Metadata/County_and_Place_Metadata_2013.txt
        'app/fields': {
            INCOME: {
                key: 'B19013_001E'
            },
            POP: {
                key: 'B01003_001E'
            },
            SQ_MILE: {
                calc: function (feature) {
                    return (feature.getProperty('ALAND') * (3.86102e-7)).toFixed(3);
                }
            },
            DENSITY: {
                calc: function (feature) {
                    return Math.round(feature.getProperty('POP') / feature.getProperty('SQ_MILE'));
                }
            }
        },
        'app/stats': {
            keys: ['B19013_001E', 'B01003_001E']
        },
        'app/layers': {
            linterUrl: 'http://geojsonlint.com/validate',
            validate: false,
            tables: {
                'license_liquor' : {
                    type: 'geojson',
                    field: 'address',
                    url: baseDataUrl + 'liquor.geojson',
                    template: 2,
                    style: 2
                },
                'license_food': {
                    type: 'geojson',
                    field: 'address',
                    url: baseDataUrl + 'food.geojson',
                    template: 1,
                    style: 1
                },
                'license_entertainment': {
                    type: 'geojson',
                    field: 'address',
                    url: baseDataUrl + 'entertainment.geojson',
                    template: 3,
                    style: 3
                },
                'census_geography': {
                    type: 'geojson',
                    url: baseDataUrl + 'cb_2013_25_017-021-025_tract_500k.geojson'
                }
            }
        }
    }
});

requirejs(['app/main'], function (app) {
    app.initialize();
});
