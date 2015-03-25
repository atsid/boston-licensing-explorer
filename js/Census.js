//methods for working with the US Census API
//http://api.census.gov/data/2013/acs5/examples.html
(function (scope) {

    scope.atsid = scope.atsid || {};
    scope.atsid.Census = function () {

        //this gets fields documented here: http://www2.census.gov/geo/tiger/TIGER_DP/2013ACS/Metadata/County_and_Place_Metadata_2013.txt
        //TODO: make this much more configurable so we can instantiate Census with a set of config params

        this.load = function (url, callback) {

            //census data is a tuple, with the first entry documenting the fields
            $.ajax(url, {
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
            })

        };

    };

})(this);