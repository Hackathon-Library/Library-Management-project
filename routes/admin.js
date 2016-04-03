var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var User = require('../app/model/user');
var Book = require('../app/model/book');

router.post('/bookissue', function(req, res, next){
	mongoose.connect('mongodb://user:user@ds015760.mlab.com:15760/librarymanagement');
	var user = new User();
	user.email = req.body.email;
	user.username = req.body.username;
	user.password = req.body.password;

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

router.post('/newbook', function(req, res, next){
	mongoose.connect('mongodb://user:user@ds015760.mlab.com:15760/librarymanagement');
	var book = new Book();
	book.name = req.body.bookname;
	book.authorname = req.body.author;
	book.ISBN = req.body.isbn;


	book.save(function(err) {
		if (err) {
			// duplicate entry
			if (err.code == 11000){
				User.findOneAndUpdate({ book.name: 'req.body.bookname' }, { book.numofcopies: book.numofcopies + 1 }, function(err, user) {
					if (err) throw err;
				});
			else 
				return res.send(err);
		}

		// return a message
		res.send("<html><head><title>registered</title></head><body>Book Added<br /><a href='/'>back to login page</a></body></html>");
	});
});

router.post('/bookreturn', function(req, res, next){
	mongoose.connect('mongodb://user:user@ds015760.mlab.com:15760/librarymanagement');
	var book = new Book();
	var user = new User();
	var rollnum  = req.body.rollno;
	var isbnno = req.body.isbn;
	var deadline = new Date();
	var numdaystoadd = 30;
	deadline.setDate(user.book.issuedate + numdaystoadd)
	user.find({ user.rollno: 'req.body.rollno' }, function(err, user) {
					if (err) throw err;
		var fine = Date.today() - deadline;
		user[0].fine = fine;
		res.render(BookReturn, {data: user[0]});
	});
	
	book.save(function(err) {
		if (err) {
			// duplicate entry
			if (err.code == 11000){
				User.find({ book.ISBN: 'req.body.isbn' }, { book.numofcopies: book.numofcopies - 1 }, function(err, user) {
					if (err) throw err;
				});

			

			else 
				return res.send(err);
		}

		// return a message
		res.send("<html><head><title>registered</title></head><body>Book Added<br /><a href='/'>back to login page</a></body></html>");
	});
});


module.exports = router;