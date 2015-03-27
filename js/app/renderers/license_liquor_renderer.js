"use strict";
define([
    'module'
], function (
    module
) {
    return {
        renderer: function (feature) {
            return {
                icon: 'http://labs.atsid.com/hubhacks2/img/small_green.png'
            };
        },
        attributeTableConfig: [{
            value: 'Liquor License',
            label: 'Type'
        }, {
            key: 'BUSINESSNAME',
            label: 'Business Name',
            formatter: function (data) {
                return data;
            }
        }, {
            key: 'LICSTATUS',
            label: 'Status'
        }, {
            key: 'LICCATDESC',
            label: 'Description'
        }],
        name: 'license_liquor'
    };
});