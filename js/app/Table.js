"use strict";

define([
    'jquery'
], function (
    jQuery
) {

    var getValueForAttribute = function (feature, attribute) {
        if (attribute.key) {
            return feature.getProperty(attribute.key);
        } else {
            return attribute.value;
        }
    }

    //creates a new DOM table using specified attrs from a map feature
    //TODO: pull in something with real templating
    //attributes should have a key that represents the property name within the feature, and a label
    //a formatter may optionally be provided for the value as well
    var Table = function (feature, attributeLoader) {

        var html = '<table class="attrs-table">',
            row = '<tr class="attrs-tr"><td class="attrs-td attrs-key">{key}</td><td class="attrs-td attrs-value">{value}</td></tr>',
            attributes = attributeLoader(feature);

        attributes.forEach(function (attribute) {
            var data = getValueForAttribute(feature, attribute),
                display = attribute.formatter ? attribute.formatter(data) : data;
            html += row.replace('{key}', attribute.label).replace('{value}', display);
        });

        html += '</table>';
        this.html = html;

    };

    Table.prototype.renderTo = function (element) {
        jQuery(element).html(this.html);
    };

    return Table;

});