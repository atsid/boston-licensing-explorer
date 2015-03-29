"use strict";
define([
], function (
) {
    var createPointArray = function (points) {
            return new google.maps.MVCArray(points);
        };

    return {
        removeMap: function (heatmap) {
            heatmap.setMap(null);
        },

        setPoints: function (points, map) {
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: createPointArray(points)
            });

            // showing the map if it was showed
            heatmap.setMap(map);
            return heatmap;
        }
    };
});