"use strict";

//methods for working with keyed fields, so they can be referenced by enum-like values instead of
//difficult-to-read census field headers
//NOTE: this doesn't just support census-mapped fields now - if also supports arbitrary calculated fields
//TODO: support explicit ordering of fields, since some of them have calculations that are dependent on previous
//fields being set in the feature
define(['module'], function (module) {

    var config = module.config(),
        fields = {};

    //add each config item as a root object with convenience methods
    Object.keys(config).forEach(function (field) {
        fields[field] = config[field];
        fields[field].field = field;
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

    //iterator that applies a function to each of the keys
    fields.forEach = function (func, scope) {
        Object.keys(config).forEach(function (field) {
            func.call(scope, fields[field]);
        });
    };

    return fields;

});
