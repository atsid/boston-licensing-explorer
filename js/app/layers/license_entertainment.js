"use strict";
define([
    'module'
], function (
    module
) {
    return {

        name: 'license_entertainment',
        type: 'points',

        url: module.config().url,

        renderer: function (feature) {
            return {
                icon: 'img/small_yellow.png'
            };
        },

        attributeTableConfig: [{
            value: 'Entertainment License',
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