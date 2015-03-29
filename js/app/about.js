"use strict";

define([
    'jquery',
    'jqueryui'
], function (
    jQuery
) {

    var aboutBox;

    if (!aboutBox) {
        var html = '<div>' +
                        '<h2>Census Bureau</h2>' +
                        'All services, which utilize or access the API, should display the following notice prominently ' +
                        'within the application: "This product uses the Census Bureau Data API but is not endorsed or ce' +
                        'rtified by the Census Bureau." You may use the Census Bureau name in order to identify the sour' +
                        'ce of API content subject to these rules. You may not use the Census Bureau name, or the like t' +
                        'o imply endorsement of any product, service, or entity, not-for-profit, commercial or otherwise.' +                        
                    '</div>';
        var tag = jQuery('<div></div>');
        aboutBox = tag.html(html).dialog({
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
