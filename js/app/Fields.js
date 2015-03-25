//methods for working with keyed fields, so they can be referenced by enum-like values instead of
//difficult-to-read census field headers
define([], function () {

    var config;

    return {

        setConfig: function (config) {

            this.config = config;

            //add each config item as a root object with convenience methods
            Object.keys(config).forEach(function (field) {
                this[field] = config[field];
                this[field].get = function (item) {
                    return item[this.key];
                };
            }, this);
        },

        //gets the list of raw census keys
        getKeys: function () {
            var keys = [], config = this.config;
            Object.keys(config).forEach(function (key) {
                keys.push(config[key].key);
            }, this);
            return keys;
        }
    };

});
