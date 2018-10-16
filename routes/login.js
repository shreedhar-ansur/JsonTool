var express = require('express');
var router = express.Router();
var mongoConfig = require('./config');
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
router.post('/login', function(req, res) {

    var appDb;
    var user = req.body.user;

    var result = {
        loginStatus : 'false',
        user : user
    };

    requestVar = {};
    responseVar = {};
    requestVar = req;
    responseVar = res;
    mongoConfig.performMongoOperation(verifyUser);

    //res.json(result);
});

router.get('/success', function (req, res) {
    console.log('success');
    res.json({result:true});
});
router.get('/unsuccess', function (req, res) {
    console.log('unsuccess');
    res.json({result:false});
});

router.post('/registerUser', function (req, res) {
    requestVar = {};
    responseVar = {};
    requestVar = req;
    responseVar = res;
    var result = mongoConfig.performMongoOperation(insertUser);
});

var requestVar = {};
var responseVar = {};

var insertUser = function(err, db) {
    if(err) {
        console.log(err);
        //responseVar.redirect("unsuccess");
        //return "not registered";
        responseVar.json({result:false});
    } else {
        db.collection('users').findOne({name:requestVar.body.name}).then(function (col) {
            if(col) {
                //responseVar.redirect("unsuccess");
                responseVar.json({result:false});
            } else {
                db.collection('users').insertOne({
                    name : requestVar.body.name,
                    pass : requestVar.body.password,
                    status : 'active',
                    loginStatus : 'false'
                });
                //responseVar.redirect("success");
                responseVar.json({result:true});
            }
        });
    }
};



var verifyUser = function (err, db) {
    if(err) {
        console.log(err);
        //responseVar.redirect("unsuccess");
        //return "not registered";
        responseVar.json({result:false});
    } else {
        db.collection('users').findOne({name:requestVar.body.name,pass:requestVar.body.password}).then(function (col) {
            if(col) {
                var resObj = {
                    result:true,
                    user:col
                }
                responseVar.json(resObj);
            } else {
                responseVar.json({result:false});
            }
        });
    }
}

module.exports = router;