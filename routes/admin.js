var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var User = require('../app/model/user');
var Books = require('../app/model/Books')

router.post('/bookissue', function(req, res, next){
	mongoose.connect('mongodb://user:user@ds015760.mlab.com:15760/librarymanagement');
	var rollno = req.body.rollno;

	Books.find({isbn:req.body.isbn}, function(err,books) {
		if(err) {
			return res.send(err);
		}
		if(books[0].numofcopies == 0)
			return res.send("Not enough copies");
		else {
			User.find({rollno:req.body.rollno}, function(err, users) {
				
			})
			return res.send("Book have been issued");
		}
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