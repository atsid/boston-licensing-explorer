"use strict";

define([
    'module',
    'jquery',
    './map',
    './census',
    './features',
    './fields',
    './layers',
    './search',
    './widget/about',
    './widget/status'
], function (
    module,
    jQuery,
    map,
    census,
    features,
    fields,
    layers,
    search,
    about,
    status
) {

    var config = module.config();

    return {

        initialize: function () {

            status.show('Loading census API data...');

            //load the census data first, then pass it into the feature manager so it is ready for when the feature data returns
            census.load(
                config.census_url,
                function (data) {
                    features.load(
                        data,
                        function () {
                            status.hide();
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
                if (e.target.id !== 'toggle_heatmap') {
                    layers.displayLayer(e.target.id);
                } else {
                    console.log(' calling toggle heatmap ...');
                    layers.toggleHeatMapDrawing();
                }
            });

        }
    };

});
