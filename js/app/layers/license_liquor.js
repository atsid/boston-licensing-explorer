"use strict";
define([
    'module'
], function (
    module
) {
    return {

        name: 'license_liquor',
        type: 'points',

        url: module.config().url,

        renderer: function (feature) {
            return {
                icon: 'img/small_green.png'
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
        }]

    };
});