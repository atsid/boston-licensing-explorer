"use strict";

define([
    'jquery',
    'jqueryui',
    'text!./about.html'
], function (
    jQuery,
    jQueryUI,
    template
) {

    var aboutBox;

    if (!aboutBox) {
        var tag = jQuery('<div></div>');
        aboutBox = tag.html(template).dialog({
            modal: true,
            title: "About",
            width: 600,
            height: 450
        }).dialog('close');
    }

    jQuery("#about_link").click(function () {
        if (aboutBox && !aboutBox.dialog('isOpen')) {
            aboutBox.dialog('open');
        }
    });

});
