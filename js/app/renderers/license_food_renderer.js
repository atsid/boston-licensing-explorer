"use strict";
define([
    'module'
], function (
    module
) {
    return {
        renderer: function (feature) {
            return {
                icon: 'http://labs.atsid.com/hubhacks2/img/small_red.png'
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
        }],
        name: 'license_food'
    };
});