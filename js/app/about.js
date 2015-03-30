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
                        '<p>Please see our <a href="https://github.com/atsid/boston-licensing-explorer" target="_blank">GitHub page</a> ' +
                        'for more information and source code (licensed under <a href="http://opensource.org/licenses/Apache-2.0" target="_blank">Apache version 2</a>).' +
                        '<h3>Census Bureau Data Notice</h3>' +
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
