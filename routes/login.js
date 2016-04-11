var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../app/model/user');
var Book = require('../app/model/Books');
var moment = require('moment')

var session;

/* GET home page. */
router.get('/', function(req, res, next) {

	session = req.session;
	
	if(session.user) {
		if(session.user.role=="admin")
			res.render('pages/Admin', {data:session.user,books:session.books});
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
			else {

				var arr = [];
				var deadline = [];

				for(i = 0; i < user.books.length; i++) {
					arr[i] = user.books[i].book;
					deadline[i] = moment(user.books[i].issuedate).add(30, 'days').calendar();
				}

				Book.find({'_id': {$in: arr}}, function(err,books) {
					if(err)
						return res.end(err)
					books.deadline = deadline
					session.books = books
					res.render('pages/stu_fac', {data:user, books:books});
				});
			}
		}
		else{
			res.sendFile(path.join(__dirname, '../public/login.html'));
		}
	});
});
module.exports = router;
