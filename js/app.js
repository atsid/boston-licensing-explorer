var map,
    layers = [];

function initialize() {
    var boston = { lat: 42.3601, lng: -71.0589 };
    var mapOptions = {
        center: boston,
        zoom: 11
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    var tracts = new google.maps.KmlLayer({
        url: 'http://labs.atsid.com/hubhacks2/data/cb_2013_25_tract_500k.kmz'
    });
    tracts.setMap(map);
}

function createLayer(name) {
    var layer, obj;
    if (name === 'license_food') {
        layer = new google.maps.FusionTablesLayer({
            query: {
                select: 'address',
                from: '1XFIER_sMIIC1LqEfl9Rxt7XKy-eHR0pw_dSMDPSe'
            }
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
