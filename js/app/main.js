"use strict";

define([
    'module',
    'jquery',
    './map',
    './about',
    './census',
    './features',
    './fields',
    './layers',
    './search',
    './stats',
    './geoprocessing',
    './Legend'
], function (
    module,
    jQuery,
    map,
    about,
    census,
    features,
    fields,
    layers,
    search,
    stats,
    geoprocessing,
    Legend
) {

    var config = module.config();

    return {

        initialize: function () {

            //load the census data first, then pass it into the feature manager so it is ready for when the feature data returns
            census.load(
                config.census_url,
                function (data) {

                    console.log('census hash', data);

                    features.load(
                        data,
                        function () {
                            new Legend(config.colors, config.color_labels).renderTo('#legend'); //this should go somewhere else
                        }
                    );

                }
            );

            //hook up the checkbox changes to toggle layer display
            jQuery('.cb').change(function (e) {
                layers.displayLayer(e.target.id);
            });

        }
    };

});
