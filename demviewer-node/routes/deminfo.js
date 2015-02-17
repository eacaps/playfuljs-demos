var express = require('express');
var router = express.Router();
var demgdalinfo = require('./demgdalinfo')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var result = demgdalinfo('/opt/work-dir/terrain/demviewer-node/public/data/test02.tif')
  res.json(result);
  /*
  res.json({
    scalevalue: 1140,
    bbox: {
      top : 74,
      left: 81,
      bottom: 73,
      right: 82
    }
  });*/
});

module.exports = router;
