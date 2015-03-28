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
    './geoprocessing'
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
    geoprocessing
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
                            console.log('everything loaded');
                        }
                    );

                }
            );

            //hook up selects and checkboxes to change layer displays
            jQuery('#census-select').change(function (e) {
                layers.changeData('census_geography', e.target.value);
            });

            jQuery('.cb').change(function (e) {
                layers.displayLayer(e.target.id);
            });

        }
    };

});
