//main app entry point, sets up map system and hooks general events
(function (scope) {

    scope.atsid = scope.atsid || {};

    scope.atsid.app = {


        initialize: function () {

            var boston = { lat: 42.3601, lng: -71.0589 };
            var mapOptions = {
                center: boston,
                zoom: 12
            };
            var fields = {
                'B19013_001E': 'Median Income',
                'B01003_001E': 'Total Population'
            };

            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            //load the features, then load the census data and pass it to the features for drilldown
            var features = new atsid.Features(map);
            var census = new atsid.Census();
            var stats = new atsid.Stats(['B19013_001E', 'B01003_001E']);

            census.load(
                'http://api.census.gov/data/2013/acs5?get=B19013_001E,B01003_001E&for=tract:*&in=state:25+county:*',
                function (data) {
                    console.log('census hash', data);

                    features.setData(data);

                    features.load('http://labs.atsid.com/hubhacks2/data/cb_2013_25_tract_500k.geojson', function () {

                        stats.run(data);
                        Object.keys(fields).forEach(function (field) {
                            console.log('stats for ' + field, stats.stats[field]);
                        });

                    });



                });




            var layers = new atsid.Layers(map);

            var checks = document.getElementsByClassName('cb');

            for (var i = 0; i < checks.length; i += 1) {
                checks[i].addEventListener('change', function (e) {
                    layers.displayLayer(e.target.id);
                });
            }

        }

    };

})(this);