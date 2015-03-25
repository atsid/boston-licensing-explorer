//constructor for dealing with the main dataset.
(function (scope) {

    scope.atsid = scope.atsid || {};
    //create a Features instance for the current map, using data from specified url.
    scope.atsid.Features = function (map, url, options) {

        var data,
            opts = options || {
                idPropertyName: 'name'
            };

        this.renderer = function (feature) {

            var selected = feature.getProperty('selected');

            return ({
                fillOpacity: selected ? 0.2 : 0,
                fillColor: 'black',
                strokeColor: 'green',
                strokeWeight: 2
            });

        };

        //capture the loaded data in closure
        map.data.loadGeoJson(url, opts, function () {

            data = map.data;

            data.setStyle(this.renderer);

            function click () {
                var previous;
                return function (event) {
                    var feature = event.feature;
                    console.log(feature.getId() + ' clicked');
                    if (previous) {
                        data.getFeatureById(previous).setProperty('selected', false);
                    }
                    previous = feature.getId();
                    feature.setProperty('selected',true);
                }
            }

            function mouseover (event) {
                document.getElementById('feature-details').innerHTML = event.feature.getProperty('description');
            }

            data.addListener('click', click().bind(this));
            data.addListener('mouseover', mouseover.bind(this));

        }.bind(this));

    };

})(this);