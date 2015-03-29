"use strict";

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
        'app/layers/license_liquor': {
            url: 'data/liquor.geojson'
        },
        'app/layers/license_food': {
            url: 'data/food.geojson'
        },
        'app/layers/license_entertainment': {
            url: 'data/entertainment.geojson'
        },
        'app/layers/census_geography': {
            url: 'data/cb_2013_25_017-021-025_tract_500k.geojson'
        }
    }
});

requirejs(['app/main'], function (app) {
    app.initialize();
});
