define([
    './map'
], function (
    map
) {

    var layers = {},
        tables = {
            'license_liquor' : {
                type: 'fusion',
                field: 'address',
                id: '1e0VQIZsvVlQIJzV_cyDhiN7LQC5J3Oxp-PXnd0AK',
                template: 2,
                style: 2
            },
            'license_food': {
                type: 'fusion',
                field: 'address',
                id: '1XFIER_sMIIC1LqEfl9Rxt7XKy-eHR0pw_dSMDPSe',
                template: 1,
                style: 1
            },
            'license_entertainment': {
                type: 'fusion',
                field: 'address',
                id: '1B3Vjkdd2zr9fmcn0vNjMlPlu6U6VkFYSFV3pMWmD',
                template: 3,
                style: 3
            }
        };

    return {

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
            }

            return obj;
        },

        //displays a specified layer
        displayLayer: function (name) {
            var layer = layers[name];

            if (!layer) {
                layer = this.createLayer(name);
            }

            if (layer.display) {
                layer.display = false;
                layer.layer.setMap(null);
            } else {
                layer.display = true;
                layer.layer.setMap(map);
            }
        }

    };

});
