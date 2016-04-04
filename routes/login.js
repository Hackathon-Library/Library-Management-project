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
	mongoose.connection.close();
	mongoose.connect('mongodb://user:user@ds015760.mlab.com:15760/librarymanagement');
	user.find({email:req.body.email}, function(err,users){
		if(err)
			return res.send(err);
		console.log(users[0]);
		if(req.body.password == users[0].password){
			if(users[0].role=="admin")
				res.render('Admin', {data:users[0]});
			else
				res.render('stu_fac', {data:users[0]});
		}
		else{
			res.sendFile(path.join(__dirname, '../public/login.html'));
		}
		mongoose.connection.close();
	});
});
module.exports = router;
