//methods for working with keyed fields, so they can be referenced by enum-like values instead of
//difficult-to-read census field headers
define(['module'], function (module) {

    var config = module.config(),
        fields = {};

    //add each config item as a root object with convenience methods
    Object.keys(config).forEach(function (field) {
        fields[field] = config[field];
        fields[field].get = function (item) {
            return item[this.key];
        };
    });

    //gets the list of raw census keys
    fields.getKeys = function () {
        var keys = [];
        Object.keys(config).forEach(function (key) {
            keys.push(config[key].key);
        });
        return keys;
    };

    return fields;

});
