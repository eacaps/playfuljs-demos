var gdal = require("gdal");
var dataset = gdal.open("data/test02.tif");

console.log("number of bands: " + dataset.bands.count());
console.log("width: " + dataset.rasterSize.x);
console.log("height: " + dataset.rasterSize.y);
console.log("geotransform: " + dataset.geoTransform);
console.log("srs: " + (dataset.srs ? dataset.srs.toWKT() : 'null'));

var size = dataset.rasterSize;
var geotransform = dataset.geoTransform;
// corners
var corners = {
	'ul' : {x: 0, y: 0},
	//'Upper Right ' : {x: size.x, y: 0},
	'br' : {x: size.x, y: size.y},
	//'Bottom Left ' : {x: 0, y: size.y},
	//'Center      ' : {x: size.x/2, y: size.y/2}
};

var wgs84 = gdal.SpatialReference.fromEPSG(4326);
var coord_transform = new gdal.CoordinateTransformation(dataset.srs, wgs84);

console.log("Corner Coordinates:")
var corner_names = Object.keys(corners);
corner_names.forEach(function(corner_name) {
	// convert pixel x,y to the coordinate system of the raster
	// then transform it to WGS84
	var corner      = corners[corner_name];
	var pt_orig     = {
		x: geotransform[0] + corner.x * geotransform[1] + corner.y * geotransform[2],
		y: geotransform[3] + corner.x * geotransform[4] + corner.y * geotransform[5]
	}
	var pt_wgs84    = coord_transform.transformPoint(pt_orig);
	corners[corner_name] = pt_wgs84;
	console.log(corner_name+':'+corners[corner_name].x+","+corners[corner_name].y);
});

dataset.bands.forEach(function(band) {
	var stats = band.getStatistics(true, true);
	console.log('computed min:'+stats.min);
	console.log('computed max:'+stats.max);
	console.log("min: "+band.minimum);
	console.log('  Max=' + Math.floor(band.maximum * 1000) / 1000);
	if (band.noDataValue !== null) {
		console.log('  NoData Value='+band.noDataValue);
	}
})