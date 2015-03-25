//constructor for dealing with the main dataset.
(function (scope) {

    scope.atsid = scope.atsid || {};
    //create a Features instance for the current map, using data from specified url.
    scope.atsid.Features = function (map, url, options) {

        var data,
            opts = options || {
                idPropertyName: 'name'
            };

        http://www.colourlovers.com/palette/84571/echo
        var colors = ['#D8A97B', '#BC9E78', '#9F9275', '#828571', '#65796D'];

        this.renderer = function (feature) {

            var selected = feature.getProperty('selected');

            return ({
                fillOpacity: selected ? 0.7 : 0.5,
                fillColor: colors[Math.round(Math.random() * 5)], //totally random with each render right now
                strokeColor: selected ? '#136EFB' : '#444',
                strokeWeight: selected ? 3 : 1,
                zIndex: selected ? 1 : 0
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