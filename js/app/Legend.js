"use strict";

define([
    'jquery'
], function (
    jQuery
) {

    //colors is a list of hex colors used for the rendering, and labels is the matching list labels for what the color represents
    var Legend = function (colors, labels) {

        var html = '<table class="legend-table">',
            row = '<tr class="legend-tr"><td class="legend-td legend-key">{key}</td><td class="legend-td style=\"background-color:{color}\""> </td></tr>';

        colors.forEach(function (color, index) {
            var label = labels[index];
            html += row.replace('{key}', label).replace('{value}', color);
        });

        html += '</table>';
        this.html = html;

    };

    Legend.prototype.renderTo = function (element) {
        jQuery(element).html(this.html);
    };

    return Legend;

});