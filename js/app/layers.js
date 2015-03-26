"use strict";

define([
    './map'
], function (
    map
) {

    var layers = {},
        tables = {
            'license_liquor' : {
                type: 'geojson',
                field: 'address',
                url: 'data/liquor.geojson',
                template: 2,
                style: 2
            },
            'license_food': {
                type: 'geojson',
                field: 'address',
                url: 'data/food_small.geojson',
                template: 1,
                style: 1
            },
            'license_entertainment': {
                type: 'geojson',
                field: 'address',
                url: 'data/entertainment.geojson',
                template: 3,
                style: 3
            }
        };

    return {

        addLayer: function (url) {
            $.ajax({
                'async' : true,
                'global' : false,
                'url' : url,
                'dataType': 'json',
                'success': function (data) {
                    $.ajax({
                        url: 'http://geojsonlint.com/validate',
                        type: 'POST',
                        data: data,
                        dataType: 'json',
                        success: function (done) {
                            console.log('lint ok ' + done);
                            map.data.addGeoJson(data);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            });
        },

        //creates a fusion layer, mapping into the config by name
        createLayer: function (name) {
            var table, layer, obj;

            table = tables[name];

            if (table.type === 'fusion') {
                layer = new google.maps.FusionTablesLayer({
                    query: {
                        select: table.field,
                        from: table.id
                    },
                    templateId: table.template,
                    styleId: table.style
                });
                obj = {
                    layer: layer,
                    display: false
                };
                layers[name] = obj;
            } else if (table.type === 'geojson') {
                this.addLayer(table.url);
            }

            return obj;
        },

        //displays a specified layer
        displayLayer: function (name) {
            var layer = layers[name];

            if (!layer) {
                layer = this.createLayer(name);
            }
        }

    };

});
