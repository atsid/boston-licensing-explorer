var map,
    layers = [],
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

function initialize() {
    var boston = { lat: 42.3601, lng: -71.0589 };
    var mapOptions = {
        center: boston,
        zoom: 12
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    map.data.loadGeoJson('http://labs.atsid.com/hubhacks2/data/cb_2013_25_017-021-025_tract_500k.geojson');

    map.data.setStyle(function(feature) {
        var selected = feature.getProperty('selected');

        return ({
            fillOpacity: selected ? 0.2 : 0,
            fillColor: 'black',
            strokeColor: 'green',
            strokeWeight: 2
        });
    });

    map.data.addListener('click', function(event) {
        var selected = event.feature.getProperty('selected');
        event.feature.setProperty('selected', !selected);
    });

    map.data.addListener('mouseover', function(event) {
        document.getElementById('feature-details').innerHTML = event.feature.getProperty('description');
    });

//    var tracts = new google.maps.KmlLayer({
//        url: 'http://labs.atsid.com/hubhacks2/data/cb_2013_25_tract_500k.kmz'
//    });
//    tracts.setMap(map);
}

function createLayer(name) {
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
}

function displayLayer(name) {
    var layer = layers[name];

    if (!layer) {
        layer = createLayer(name);
    }

    if (layer.display) {
        layer.display = false;
        layer.layer.setMap(null);
    } else {
        layer.display = true;
        layer.layer.setMap(map);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
