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
    './Legend'
], function (
    module,
    jQuery,
    about,
    map,
    census,
    features,
    fields,
    layers,
    search,
    stats,
    Legend
) {

    var config = module.config();

    return {

        initialize: function () {

            //load the census data first, then pass it into the feature manager so it is ready for when the feature data returns
            census.load(
                'http://api.census.gov/data/2013/acs5?get=' + fields.getKeys().join(',') + '&for=tract:*&in=state:25+county:*',
                function (data) {

                    console.log('census hash', data);

                    features.load(
                        'http://labs.atsid.com/hubhacks2/data/cb_2013_25_tract_500k.geojson',
                        data,
                        function () {
                            //stats.run(data);
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
