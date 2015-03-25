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
        var colors = ['#D8A97B', '#BC9E78', '#9F9275', '#828571', '#65796D'],
            //this is pretty arbitrary, but ramps up to capture a little more granularity in the more common < 100k bins
            income_bins = [20000, 60000, 80000, 100000, 150000];

        function findIncomeBin(income) {
            var index = income_bins.length - 1;
            income_bins.some(function (bin, idx) {
                if (income < bin) {
                    index = idx;
                    return true;
                }
            });
                return index;
        }

        this.renderer = function (feature) {

            var selected = feature.getProperty('selected'),
                hovered = feature.getProperty('hovered'),
                id = feature.getId(),
                income = 0,
                bin,
                color = '#999';

            if (data) {
                income = data[id]['B19013_001E'];
                bin = findIncomeBin(income);
                color = colors[bin];
            }

            return ({
                fillOpacity: (selected || hovered) ? 0.8 : 0.6,
                fillColor: color,
                strokeColor: (selected || hovered) ? '#136EFB' : '#444',
                strokeWeight: selected ? 3 : hovered ? 2 : 1,
                zIndex: selected ? 2 : hovered ? 1 : 0
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

                function mouseover () {
                    var previous;
                    return function (event) {
                        var feature = event.feature,
                            id = feature.getId(),
                            item;

                        document.getElementById('feature-details').innerHTML = feature.getProperty('description'); //TODO: this can now be crafted from direct attrs

                        if (data && (item = data[id])) {
                            document.getElementById('data-details').innerHTML = 'Median Income : $' + (item['B19013_001E'] || 0)  + '<br> Total Population: ' + item['B01003_001E'];
                        }

                        if (previous) {
                            d.getFeatureById(previous).setProperty('hovered', false);
                        }
                        previous = id;
                        feature.setProperty('hovered',true);

                    }


                }

                d.addListener('click', click().bind(this));
                d.addListener('mouseover', mouseover().bind(this));

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