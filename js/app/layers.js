"use strict";

define([
    'module',
    'jquery',
    './map',
    './heatmap',
    './layer_config',
    './widget/status'
], function (
    module,
    jQuery,
    map,
    heatmap,
    layer_config,
    status
) {

    var mapFeatureLayers = {},
        geoJsonLayers = {},
        layerMeta = [],
        theHeatmap,
        showHeatMap = false,
        getVisiblePoints = function () {
            var points = [],
                latLng, i, k,
                geoJson;

            for (i = 0; i < layerMeta.length; i++) {
                if (layerMeta[i].name !== 'census_geography' && layerMeta[i].visible) {
                    geoJson = geoJsonLayers[layerMeta[i].name];
                    for (k = 0; k < geoJson.features.length; k++) {
                        latLng = getLatLongFromCoordiantes(geoJson.features[k].geometry.coordinates);
                        points.push(latLng);
                    }
                }
            }

            return points;
        },
        getLatLongFromCoordiantes = function (coordinates) {
            // a Lat Long Coordinates pair from geoJson Data...
            return new google.maps.LatLng(coordinates[1], coordinates[0]);
        },
        getLayerMetaByName = function (name) {
            for (var i = 0; i < layerMeta.length; i++) {
                if (layerMeta[i].name === name) {
                    return layerMeta[i];
                }
            }

            return null;
        },
        removeVisibleLayers = function () {
            var i;
            for (i = 0; i < layerMeta.length; i++) {
                if (layerMeta[i].name != 'census_geography' && layerMeta[i].visible) {
                    removePointsFromMap(layerMeta[i].name);
                }
            }
        },
        showVisibleLayers = function () {
            var i;
            for (i = 0; i < layerMeta.length; i++) {
                if (layerMeta[i].name != 'census_geography' && layerMeta[i].visible) {
                    addPointsToMap(layerMeta[i].name);
                }
            }
        },
        removePointsFromMap = function (name) {
            for (var i = 0; i < mapFeatureLayers[name].length; i++) {
                map.data.remove(mapFeatureLayers[name][i]);
            }
        },
        addPointsToMap = function (name) {
            if (mapFeatureLayers[name]) {
                for (var i = 0; i < mapFeatureLayers[name].length; i++) {
                    map.data.add(mapFeatureLayers[name][i]);
                }
            } else {
                var geoJson = geoJsonLayers[name];
                mapFeatureLayers[name] = map.data.addGeoJson(geoJsonLayers[name]);
            }
        },
        toggleHiddenPoints = function (layer, options) {
            var i;

            if (layer.visible) {
                if (mapFeatureLayers[layer.name]) {
                    addPointsToMap(layer.name);
                } else {
                    var geoJson = geoJsonLayers[layer.name];
                    mapFeatureLayers[layer.name] = map.data.addGeoJson(geoJsonLayers[layer.name], options || {});
                }
            } else if (mapFeatureLayers[layer.name]) {
                removePointsFromMap(layer.name);
            }
        },
        toggleHiddenHeatmap = function () {
            var points = getVisiblePoints();
            heatmap.removeMap(theHeatmap);
            theHeatmap = heatmap.setPoints(points, map);
        },
        toggleHidden = function (layer, options, callback) {
            var loadCallback = function (name, options) {
                if (showHeatMap) {
                    toggleHiddenHeatmap(layer);
                } else {
                    toggleHiddenPoints(layer, options);
                }

                // callback expects to get the geojson data...
                if (callback) {
                    callback(geoJsonLayers[name]);
                }
            }.bind(this);

            layer.visible = !layer.visible;
            if (layer.visible && !geoJsonLayers[layer.name]) {
                loadLayer(layer.config.url, layer.name, options, loadCallback);
            } else {
                loadCallback(layer.name, options);
            }
        },
        createPolygonFeatures = function (data, options) {
            // the polygons will always be on the map for display so we don't need to
            // create them w/o adding them to the map.
            return map.data.addGeoJson(data, options || {});
        },
        createPointFeatures = function (data, name) {
            var i, features = [],
                feature,
                featureOptions,
                latLng;
            for (i = 0; i < data.features.length; i++) {
                feature = data.features[i];
                latLng = new google.maps.LatLng(
                    feature.geometry.coordinates[0],
                    feature.geometry.coordinates[1]
                );
                featureOptions = {
                    geometry: new google.maps.Data.Point(latLng),
                    properties: data.features[i].properties
                };
                features.push(new google.maps.Data.Feature(featureOptions));
            }

            return features;
        },
        loadLayer = function (url, name, options, callback) {
            var success = function (data) {
                geoJsonLayers[name] = data;
                callback(name, options);
            };

            jQuery.ajax({
                'url' : url,
                'dataType': 'json',
                'success' : success
            });
        };

    return {

        //creates a fusion layer, mapping into the config by name
        createLayer: function (name, options, callback) {
            this.addLayer(layer_config[name], name, options, callback);
        },

        //displays a specified layer
        displayLayer: function (name, options, callback) {
            var layer = getLayerMetaByName(name);
            if (!layer) {
                layer = {
                    name: name,
                    visible: false,
                    config: layer_config[name]
                };

                layerMeta.push(layer);
            }

            toggleHidden(layer, options, callback);
        },

        //change the rendered data within a layer
        //only really applies to the census right now,
        //since everything else is point data
        changeData: function (name, attribute) {
            layer_config[name].setAttribute(attribute);
            var legend = this.getLegend(name),
                layer = getLayerMetaByName(name);

            if (legend) {
                legend.renderTo('#legend');
            }
            //toggling on and off seems to be the only way to force a redraw with the new data

            toggleHidden(layer);

            toggleHidden(layer);
        },

        getRenderer: function (name) {
            return layer_config[name].renderer;
        },

        getAttributeTableConfig: function (name) {
            return layer_config[name].attributeTableConfig;
        },

        getLegend: function (name) {
            var legend = layer_config[name].getLegend;
            return legend && legend();
        },

        toggleHeatMapDrawing: function () {
            showHeatMap = !showHeatMap;

            if (showHeatMap) {
                removeVisibleLayers();
                theHeatmap = heatmap.setPoints(getVisiblePoints(), map);
            } else {
                heatmap.removeMap(theHeatmap);
                showVisibleLayers();
            }
        }

    };

});
