var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../app/model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname,'../public/register.html'));
});

router.post('/', function(req, res, next){
	var user = new User();
	user.email = req.body.email;
	user.username = req.body.username;
	user.password = req.body.password;
	user.name = req.body.name;
	user.rollno = req.body.rollno;
	user.branch = req.body.branch;
	user.role = req.body.role;

	user.save(function(err) {
		if (err) {
			// duplicate entry
			if (err.code == 11000) 
				return res.json({ success: false, message: 'A user with that username already exists. '});
			else 
				return res.send(err);
		}

		// return a message
		res.send("<html><head><title>registered</title></head><body>User created<br /><a href='/'>back to login page</a></body></html>");
	});
});

module.exports = router;
