var express = require('express');
var fs = require('fs-extra'),
    xml2js = require('xml2js'),
    util = require('util');
var path = require('path');
var nrc = require('node-cmd');
var Promise = require('bluebird');
var router = express.Router();

/* GET users listing. */
router.get('/home/', function(req, res, next) {
    console.log('redering home page');
    res.render('homePage.html', { title: 'Express' });
});

router.get('/modifyXml/', function (req, res, next) {
    var parser = new xml2js.Parser();
    var xmlBuilder = new xml2js.Builder();

    var xmlFile = path.dirname(require.main.filename)+'\\public\\resourcess\\plant_catalog.xml';

    fs.readFile(xmlFile, function (err, data) {
        parser.parseString(data, function (err, res) {
            util.inspect(res, false, null);
            var plantObj = res.CATALOG.PLANT[0];
            console.log(plantObj.COMMON[0].$.attr1);
            plantObj.COMMON[0]._ = 'modifieeeeeed';
            res.CATALOG.PLANT.COMMON = plantObj;
            var xml = xmlBuilder.buildObject(res);
            fs.writeFile(xmlFile,xml);
        })
    });

    var commands = [

    ];
    const getAsync = Promise.promisify(nrc.get, { multiArgs: true, context: nrc })

    getAsync('node -v').then(function (data) {
        console.log('cmd data', data);
    }).catch(function (err) {
            console.log('cmd err', err);
    });

    res.json({});
})


module.exports = router;