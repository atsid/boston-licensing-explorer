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

            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            var features = new atsid.Features(
                map,
                'http://labs.atsid.com/hubhacks2/data/cb_2013_25_017-021-025_tract_500k.geojson'
            );

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