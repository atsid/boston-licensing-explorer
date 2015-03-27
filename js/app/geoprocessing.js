"use strict";
/**
 * Geoprocessing utilities for doing spatial analysis within the Google Maps API.
 * All they really provide is hit testing, so we'll expand that to include any
 * standard geoprocessing algorithms that we need.
 * See https://developers.google.com/maps/documentation/javascript/3.exp/reference#spherical
 * and https://developers.google.com/maps/documentation/javascript/3.exp/reference#poly
 */
define({

    /**
     * Calculates a bounding box for a google.maps.Polygon
     * @param polygon
     * @returns google.maps.LatLngBounds representing the minimum bounding rectangle
     */
    bounds: function (polygon) {
        var minx = 180, maxx = -180, miny = 90, maxy = -90;
        polygon.getPath().forEach(function (ltlng) {
            var lng = ltlng.lng(),
                lat = ltlng.lat();
            minx = Math.min(minx, lng);
            maxx = Math.max(maxx, lng);
            miny = Math.min(miny, lat);
            maxy = Math.max(maxy, lat);
        });

        return new google.maps.LatLngBounds(
            new google.maps.LatLng(minx, miny),
            new google.maps.LatLng(maxx, maxy)
        );

    },

    /**
     * Joins a set of points into a set of polygons.
     * Note that for now it simply sums the point count and adds it as a property to the polygon Feature.
     * @param {Feature[]} polygons - array of Features that represent the polygons to check points against.
     * @param {Feature[]} points - array of Features that represent the points to bin into polygons.
     * @param {String} property - property name to store the point count value
     */
    spatialJoinWithin: function (polygons, points, property) {

        var start = Date.now(),
            getBounds = this.bounds,
            polyCount = 0,
            comparisonCount = 0;

        //sort ascending x, so we can short-circuit hit test loops
        //this lets us only do an actual hit test on points within a longitude "band",
        //which saves quite a bit of time
        points.sort(function (p1, p2) {
            return p1.getGeometry().get().lng() - p2.getGeometry().get().lng();
        });

        //finds first index greater than lng
        function findMinIndex(points, lng) {
            //TODO: replace this with a binary search
            for (var i = 0; i < points.length; i += 1) {
                if (points[i].getGeometry().get().lng() >= lng) {
                    return i;
                }
            }
            return 0;
        }

        polygons.forEach(function (polygon) {

            var count = 0,
                poly,
                bounds,
                index,
                point,
                i;

            try {

                //need to convert data polygons to base polygons for containsLocation
                poly = new google.maps.Polygon({
                        paths: polygon.getGeometry().getArray().map(function (ring) {
                            return ring.getArray();
                        })
                    });

                bounds = getBounds(poly);

                index = findMinIndex(points, bounds.getSouthWest().lng());

                for (i = index; i < points.length; i += 1) {

                    point = points[i];
                    comparisonCount += 1;

                    try {
                        var pointLtLng = point.getGeometry().get(),
                            lng = pointLtLng.lng(),
                            contained;

                        contained = google.maps.geometry.poly.containsLocation(pointLtLng, poly);

                        if (contained) {
                            count += 1;
                        } else if (lng > bounds.getNorthEast().lng()) {
                            break;
                        }

                    } catch (e) {
                        //ignore bad points
                        console.log('Error with point ' + point.getId());
                    }

                }

                polyCount += 1;

            } catch (e) {
                //some of the census data may have unsupported geometry for this simple analysis (e.g., donuts)
                console.log('Error joining with polygon ' + polygon.getId());
            } finally {
                polygon.setProperty(property, count);
            }

        });

        console.log('successful polygons ' + polyCount);
        console.log('comparisons: ' + comparisonCount + ' (out of ' + (polygons.length * points.length) + ' brute force)');
        console.log('spatial join: ' + (Date.now() - start) + 'ms');

    }

});