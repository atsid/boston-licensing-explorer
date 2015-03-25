define([
    './census',
    './features',
    './fields',
    './layers',
    './stats'
], function (
    census,
    features,
    fields,
    layers,
    stats
) {
    return {
        initialize: function () {

            var boston = { lat: 42.3601, lng: -71.0589 },
                mapOptions = {
                    center: boston,
                    zoom: 12
                },
                fieldConfig = {
                    'INCOME': {
                        key: 'B19013_001E',
                        label: 'Median Income'
                    },
                    'POP': {
                        key: 'B01003_001E',
                        label: 'Total Population'
                    }
                };

            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            fields.setConfig(fieldConfig);
            //load the features, then load the census data and pass it to the features for drilldown
            features.init(map, fields);
            stats.setKeys(fields.getKeys());

            census.load(
                'http://api.census.gov/data/2013/acs5?get=' + fields.getKeys().join(',') + '&for=tract:*&in=state:25+county:*',
                function (data) {
                    console.log('census hash', data);

                    features.setData(data);

                    features.load('http://labs.atsid.com/hubhacks2/data/cb_2013_25_tract_500k.geojson', function () {

                        stats.run(data);
                        fields.getKeys().forEach(function (field) {
                            console.log('stats for ' + field, stats.stats[field]);
                        });

                    });

                }
            );

            layers.setMap(map);

            var checks = document.getElementsByClassName('cb');

            for (var i = 0; i < checks.length; i += 1) {
                checks[i].addEventListener('change', function (e) {
                    layers.displayLayer(e.target.id);
                });
            }
        }
    };

});
