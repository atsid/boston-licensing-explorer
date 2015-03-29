//loads a set of polygons and points, and performs a WITHIN spatial join
//the polygons are simply re-written with a count property for the point layers
var fs = require('fs');
var geolib = require('geolib');

function spatialJoinWithin (polygons, points) {

    var start = Date.now(),
        polyCount = 0,
        comparisonCount = 0,
        layer = points[0].properties.layer,
        property = layer + '_count',
        pointHash = {},
        id = 0;

        points.forEach(function (point) {
          pointHash[id += 1] = point;
        })

    console.log('processing join for point layer: ' + layer);

    polygons.forEach(function (polygon) {

        var name = polygon.properties.name,
            count = 0,
            coords;

        try {

            coords = polygon.geometry.coordinates[0].map(function (coordinate) {
                return {
                    latitude: coordinate[1],
                    longitude: coordinate[0]
                };
            });

            Object.keys(pointHash).forEach(function (key) {

                var point = pointHash[key];
                comparisonCount += 1;

                try {
                    var pointLtLng = {
                        latitude: point.geometry.coordinates[1],
                        longitude: point.geometry.coordinates[0]
                    },
                        contained;

                    contained = geolib.isPointInside(pointLtLng, coords);

                    if (contained) {
                        count += 1;
                        delete pointHash[key];
                    }

                } catch (e) {
                    //ignore bad points
                    //console.log('Error with point ', point);
                }
            });

            polyCount += 1;

        } catch (e) {
            //some of the census data may have unsupported geometry for this simple analysis (e.g., donuts)
            console.log('Error joining with polygon ' + name);
        } finally {
            console.log(polyCount + ' | ' + name + ' -> ' + count);
            polygon.properties[property] = count;
        }

    });

    console.log('successful polygons ' + polyCount);
    console.log('comparisons: ' + comparisonCount + ' (out of ' + (polygons.length * points.length) + ' brute force)');
    console.log('spatial join: ' + (Date.now() - start) + 'ms');

}


var polyfilename = __dirname + '/../data/cb_2013_25_017-021-025_tract_500k.geojson';
//var polyfilename = __dirname + '/../data/tracts-small.geojson';
var pointfilenames = [
  __dirname + '/../data/food.geojson',
  __dirname + '/../data/liquor.geojson',
  __dirname + '/../data/entertainment.geojson',
];
var polys = JSON.parse(fs.readFileSync(polyfilename));

console.log('polgons: ' + polys.features.length);

pointfilenames.forEach(function (filename) {
    var points = JSON.parse(fs.readFileSync(filename));
    console.log('points: ' + points.features.length);
    spatialJoinWithin(polys.features, points.features);
});

fs.writeFileSync(polyfilename, JSON.stringify(polys));
