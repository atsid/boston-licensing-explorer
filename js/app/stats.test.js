"use strict";
requirejs.config({
    config: {
        'js/app/stats': {
            keys: ['FIELD1']
        }
    }
});

define(['./stats'], function (stats) {

    var data = {
        'ITEM1': {
            'FIELD1': 1
        },
        'ITEM2': {
            'FIELD1': 3
        },
        'ITEM3': {
            'FIELD1': 6
        },
        'ITEM4': {
            'FIELD1': 2
        }
    };

    describe('stats.js', function () {

        it('basic stats are correctly calculated', function () {

            var result = stats.run(data).stats.FIELD1;

            expect(result.count).to.equal(4);
            expect(result.min).to.equal(1);
            expect(result.max).to.equal(6);
            expect(result.avg).to.equal(3);
            
        });

    });

});