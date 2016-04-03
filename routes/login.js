var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '../public/login.html'));
});
router.post('/', function(req, res, next){
	if(req.body.email=='avaninith@gmail.com' && req.body.password == 'avani123'){
		res.sendFile(path.join(__dirname, '../public/stu_fac.html'));
	}
	else{
		res.sendFile(path.join(__dirname, '../public/login.html'));
	}
});
module.exports = router;
