//methods for working with keyed fields, so they can be referenced by enum-like values instead of
//difficult-to-read census field headers
(function (scope) {

    scope.atsid = scope.atsid || {};
    //config object should be a hash with useful enum-like names for the keys. the values should include a key
    //that maps as a census data key, and a label for display
    scope.atsid.Fields = function (config) {

        //add each config item as a root object with convenience methods
        Object.keys(config).forEach(function (field) {
            this[field] = config[field];
            this[field].get = function (item) {
                return item[this.key];
            };
        }, this);

        //gets the list of raw census keys
        this.getKeys = function () {
            var keys = [];
            Object.keys(config).forEach(function (key) {
                keys.push(config[key].key);
            }, this);
            return keys;
        };

    };

})(this);