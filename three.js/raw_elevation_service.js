var gdal = require("gdal");
var dataset = gdal.open("data/test02.tif");

console.log("number of bands: " + dataset.bands.count());
console.log("width: " + dataset.rasterSize.x);
console.log("height: " + dataset.rasterSize.y);
console.log("geotransform: " + dataset.geoTransform);
console.log("srs: " + (dataset.srs ? dataset.srs.toWKT() : 'null'));

dataset.bands.forEach(function(band) {
	console.log("min: "+band.minimum);
	console.log('  Max=' + Math.floor(band.maximum * 1000) / 1000);
	if (band.noDataValue !== null) {
		console.log('  NoData Value='+band.noDataValue);
	}
})