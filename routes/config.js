/**
 * Created by ssharana on 5/8/2017.
 */

var MongoClient = require('mongodb').MongoClient;

var users = {
    name : '',
    password : '',
    status : '',
    loginStatus : '',
    email : ''
};



MongoClient.connect('mongoDB://127.0.0.1:27017/tool', function(err, db) {
    if(err) {
        console.log("error occured while connecting db");
        console.log(err);
    }
    else {
        db.collection("users", function(err, col) {
            if(err) {
                console.log("error occured while creating user collection");
            }
            else {
                db.createCollection('users', function (err, collection) {
                });
            }
        });
    }
});

var mongoConfig = {};
mongoConfig.performMongoOperation = function(fn) {
    var connectPromise = MongoClient.connect('mongoDB://127.0.0.1:27017/tool', function(err, db) {
        /*setTimeout(function(){
            performAction(err, db)
        }, 5000);*/
        performAction(err, db);
    });
    var performAction =  function(err, db) {
        if(err) {
            console.log(err);
            fn(err, db);
        }
        else {
            return fn(null, db);
            db.close();
        }
    };
}
module.exports = mongoConfig;