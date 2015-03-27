/*globals document */
"use strict";

/*jslint browser:true */

requirejs.config({
    config: {
        'js/app/map': {
            map: {
                center: { lat: 42.3601, lng: -71.0589 },
                zoom: 12
            },
            element: '#map-canvas'
        }
    }
});

//setup a spot for the map to be added within the karma runner
//WARNING: this is pretty kludgy
var canvas = document.createElement('div');
canvas.id = 'map-canvas';
document.body.appendChild(canvas);

define([
    'jquery',
    './map',
    './geoprocessing'
], function (
    jQuery,
    map,
    geoprocessing
) {

    describe('geoprocessing.js', function () {

        this.timeout(10000);

        var polygons,
            points;

        //load up a map and test data sets
        //obviously this isn't really 'unit' testing unless we mock out the google APIs
        beforeEach(function (done) {

            var counter = 0;
            function check() {
                if (counter === 2) {
                    done();
                }
            }

            jQuery.ajax(
                'http://labs.atsid.com/hubhacks2/data/tracts-small.geojson',
                //'http://labs.atsid.com/hubhacks2/data/cb_2013_25_tract_500k.geojson',
                {
                    success: function (data) {
                        polygons = map.data.addGeoJson(data);
                        counter += 1;
                        check();
                    }
                }
            );

            jQuery.ajax(
                'http://labs.atsid.com/hubhacks2/data/food-small.geojson',
                {
                    success: function (data) {
                        points = map.data.addGeoJson(data);
                        counter += 1;
                        check();
                    }
                }
            );

        });

        it('spatial join WITHIN', function () {

            console.log('polygon count ' + polygons.length);
            console.log('point count ' + points.length);

            //this subset was hand-counted in arcgis to validate the spatial join
            var assertions = {
                '1008': 0,
                '1002': 0,
                '1009': 4,
                '1011.01': 3,
                '1010.02': 7,
                '1003': 0,
                '1011.02': 3,
                '1404': 1,
                '4163': 0,
                '4162': 0,
                '1010.01': 4,
                '1403': 0,
                '1001': 0
            },
                assertionCount = 0;


            
            geoprocessing.spatialJoinWithin(polygons, points, 'food_count');

            polygons.forEach(function (polygon) {

                var name = polygon.getProperty('name'),
                    count = polygon.getProperty('food_count');

                if (typeof assertions[name] !== 'undefined') { //watch for falsy 0
                    assertionCount += 1;
                    expect(count).to.equal(assertions[name]);
                }

            });

            expect(assertionCount).to.equal(13); //just make sure we got them all
        });

    });

});