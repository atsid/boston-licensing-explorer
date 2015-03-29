//removes census tracts that don't fall into the 3 counties around boston
var fs = require('fs');
var counties = {
    '017': true,
    '021': true,
    '025': true
};
var path = __dirname + '/../data/';
var filename = 'cb_2013_25_tract_500k.geojson';
var outname = 'cb_2013_25_017-021-025_tract_500k.geojson'
var text = fs.readFileSync(path + filename);
var geojson = JSON.parse(text);
var outputFeatures = [];

geojson.features.forEach(function (feature) {
    if (counties[feature.properties.COUNTYFP]) {
        outputFeatures.push(feature);
    }
});

console.log(geojson.features.length + ' original tracts');
console.log(outputFeatures.length + ' culled tracts');

geojson.features = outputFeatures;

fs.writeFileSync(path + outname, JSON.stringify(geojson));