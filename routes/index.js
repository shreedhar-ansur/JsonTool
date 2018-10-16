var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});
router.get('/checkLoginStatus', function (req, res, next) {
    
})

module.exports = router;
