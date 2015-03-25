//methods for working with the US Census API
//http://api.census.gov/data/2013/acs5/examples.html
define([
    'jquery'
], function (
    jQuery
) {

    return {

        load: function (url, callback) {

            //census data is a tuple, with the first entry documenting the fields
            jQuery.ajax(url, {
                complete: function (data) {
                    var items = data.responseJSON,
                        keys = items.shift(),
                        hash = {},
                        tract,
                        i, j;

                    //for each item in the list, map the keys list as keys in a hash.
                    //identity is a concat of state, county, and tract
                    for (i = 0; i < items.length; i += 1) {
                        tract = {};
                        for (j = 0; j < keys.length; j += 1) {
                            tract[keys[j]] = items[i][j];
                        }
                        tract.GEOID = tract.state + tract.county + tract.tract;
                        hash[tract.GEOID] = tract;
                    }

                    if (callback) {
                        callback.call(this, hash);
                    }
                }
            });
        }

    };

});
