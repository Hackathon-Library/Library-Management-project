var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../app/model/user');

var session;

/* GET home page. */
router.get('/', function(req, res, next) {

	session = req.session;
	console.log(session);
	if(session.email) {
		User.findOne({email:session.email}, function(err,user){
			if(err)
				return res.send(err);
			if(user.role=="admin")
				res.render('Admin', {data:user});
			else
				res.render('stu_fac', {data:user});
		});
	}
	else
		res.sendFile(path.join(__dirname, '../public/login.html'));

});

router.post('/', function(req, res, next){
	
	session = req.session;

	User.findOne({email:req.body.email}, function(err,user){
		if(err)
			return res.send(err);
		if(req.body.password == user.password){

			session.email = req.body.email;

			if(user.role=="admin")
				res.render('Admin', {data:user});
			else
				res.render('stu_fac', {data:user});
		}
		else{
			res.sendFile(path.join(__dirname, '../public/login.html'));
		}
	});
});
module.exports = router;
