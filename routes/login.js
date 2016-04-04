var express = require('express');
var router = express.Router();
var path = require('path');
var user = require('../app/model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.sendFile(path.join(__dirname, '../public/login.html'));

});

router.post('/', function(req, res, next){
	
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
	});
});
module.exports = router;
