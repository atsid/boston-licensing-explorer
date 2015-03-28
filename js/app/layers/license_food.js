"use strict";
define([
    'module'
], function (
    module
) {
    return {

        name: 'license_food',

        url: module.config().url,

        renderer: function (feature) {
            return {
                icon: 'img/small_red.png'
            };
        },

        attributeTableConfig: [{
            value: 'Food License',
            label: 'Type'
        }, {
            key: 'BusinessName',
            label: 'Business Name',
            formatter: function (data) {
                return data;
            }
        }, {
            key: 'LICSTATUS',
            label: 'Status'
        }, {
            key: 'DESCRIPT',
            label: 'Description'
        }]

    };
});