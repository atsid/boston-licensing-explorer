"use strict";

define([
    'jquery'
], function (
    jQuery
) {

    var outer = '#status',
        inner = '#status-text';

    return {

        hide: function () {
            jQuery(outer).addClass('hidden');
        },

        show: function (message) {
            jQuery(inner).html(message);
            jQuery(outer).removeClass('hidden');
        }

    };
});