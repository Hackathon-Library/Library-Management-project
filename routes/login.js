var express = require('express');
var router = express.Router();
var path = require('path');
mongoose = require('mongoose');
var user = require('../app/model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '../public/login.html'));
});
router.post('/', function(req, res, next){
	mongoose.connect('mongodb://user:user@ds015760.mlab.com:15760/librarymanagement');
	user.find({email:req.body.email}, function(err,users){
		if(err)
			return res.send(err);
		if(req.body.password == users[0].password){
			res.render('stu_fac');
		}
		else{
			res.sendFile(path.join(__dirname, '../public/login.html'));
		}
	});
	
});
module.exports = router;
