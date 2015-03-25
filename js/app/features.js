define([
    'module',
    './fields',
    './map'
], function (
    module,
    fields,
    map
) {

    var config = module.config(),
        colors = config.colors,
        income_bins = config.income_bins,
        opts = config.opts,
        data;

    var findIncomeBin = function (income) {
        var index = income_bins.length - 1;
        income_bins.some(function (bin, idx) {
            if (income < bin) {
                index = idx;
                return true;
            }
        });
        return index;
    };
    
    return {

        renderer: function (feature) {
            var selected = feature.getProperty('selected'),
                hovered = feature.getProperty('hovered'),
                id = feature.getId(),
                income = 0,
                bin,
                color = '#999';

            if (data) {
                income = fields.INCOME.get(data[id]);
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

        },

        load: function (url, callback) {
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
                            document.getElementById('data-details').innerHTML = fields.INCOME.label + ': $' + (fields.INCOME.get(item) || 0)  + '<br> ' + fields.POP.label + ': ' + fields.POP.get(item);
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

        },

        //set a key/value hash of data that the features can look into
        setData: function (dataHash) {
            data = dataHash;
        }

    };

});
