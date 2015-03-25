requirejs.config({
    'baseUrl': 'js/lib',
    'paths': {
        'app': '../app',
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min'
    },
    'config': {
        'app/map': {
            //starting zoom and map centering options
            map: {
                center: { lat: 42.3601, lng: -71.0589 },
                zoom: 12
            },
            element: 'map-canvas'
        },
        'app/features': {
            //http://www.colourlovers.com/palette/84571/echo
            colors: ['#D8A97B', '#BC9E78', '#9F9275', '#828571', '#65796D'],
            //this is pretty arbitrary, but ramps up to capture a little more granularity in the more common < 100k bins
            income_bins: [20000, 60000, 80000, 100000, 150000],
            //these are the geojson opts used for maps api loadGeoJson
            opts: { idPropertyName: 'GEOID' }
        },
        //field codes documented here: http://www2.census.gov/geo/tiger/TIGER_DP/2013ACS/Metadata/County_and_Place_Metadata_2013.txt
        'app/fields': {
            INCOME: {
                key: 'B19013_001E',
                label: 'Median Income'
            },
            POP: {
                key: 'B01003_001E',
                label: 'Total Population'
            }
        },
        'app/stats': {
            keys: ['B19013_001E', 'B01003_001E']
        }
    }
});

requirejs(['app/main'], function (app) {
    app.initialize();
});
