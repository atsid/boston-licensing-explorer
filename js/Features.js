//constructor for dealing with the main dataset.
(function (scope) {

    scope.atsid = scope.atsid || {};
    //create a Features instance for the current map, using data from specified url.
    scope.atsid.Features = function (map, options) {

        var data,
            opts = options || {
                idPropertyName: 'GEOID'
            };

        //http://www.colourlovers.com/palette/84571/echo
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

        this.load = function (url, callback) {

            map.data.loadGeoJson(url, opts, function () {

                var d = map.data;

                d.setStyle(this.renderer);

                function click () {
                    var previous;
                    return function (event) {
                        var feature = event.feature,
                            id = feature.getId();
                        console.log(id + ' clicked');
                        console.log(feature);
                        if (previous) {
                            d.getFeatureById(previous).setProperty('selected', false);
                        }
                        previous = id;
                        feature.setProperty('selected',true);
                    }
                }

                function mouseover (event) {

                    var feature = event.feature,
                        id = feature.getId(),
                        item;

                    document.getElementById('feature-details').innerHTML = feature.getProperty('description'); //TODO: this can now be crafted from direct attrs

                    if (data && (item = data[id])) {
                        document.getElementById('data-details').innerHTML = 'Median Income : $' + (item['B19013_001E'] || 0)  + '<br> Total Population: ' + item['B01003_001E'];
                    }
                }

                d.addListener('click', click().bind(this));
                d.addListener('mouseover', mouseover.bind(this));

                if (callback) {
                    callback.call(this);
                }

            }.bind(this));

        };

        //set a key/value hash of data that the features can look into
        this.setData = function (dataHash) {
            data = dataHash;
        };

    };

})(this);