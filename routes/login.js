var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../app/model/user');

var session;

/* GET home page. */
router.get('/', function(req, res, next) {

	session = req.session;
	console.log(session);
	if(session.user) {
		if(session.user.role=="admin")
			res.render('pages/Admin', {data:session.user});
		else
			res.render('pages/stu_fac', {data:session.user});
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

			session.user = user;

			if(user.role=="admin")
				res.render('pages/Admin', {data:user});
			else
				res.render('pages/stu_fac', {data:user});
		}
		else{
			res.sendFile(path.join(__dirname, '../public/login.html'));
		}
	});
});
module.exports = router;
