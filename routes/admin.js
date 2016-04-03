var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Books = require('../app/model/Books')
var User = require('../app/model/user');

router.post('/bookissue', function(req, res, next){
	mongoose.connect('mongodb://user:user@ds015760.mlab.com:15760/librarymanagement');
	var rollno = req.body.rollno;

	Books.findOne({isbn:req.body.isbn}, function(err,book) {
		if(err) {
			return res.send(err);
		}
		if(book.numofcopies == 0)
			return res.send("Not enough copies");
		else {
			User.findOne({rollno:req.body.rollno}, function(err, user) {
				if(err) {
					res.end("Cannot issue book");
				}
					user.books.push(book);
					user.save(function(err) {
						if(err)
							return res.end("Cannot issue book");
						return res.end("Book have been issued");
						book.numofcopies = book.numofcopies - 1;
						book.save(function(err) {});
					});
			});
		}
		mongoose.connection.close();
	});
});

router.post('/newbook', function(req, res, next){
	mongoose.connect('mongodb://user:user@ds015760.mlab.com:15760/librarymanagement');
	var book = new Books();
	book.name = req.body.bookname;
	book.authorname = req.body.author;
	book.ISBN = req.body.isbn;
	book.numofcopies = req.body.copies;

	Books.findOne({isbn:req.body.isbn}, function(err,books) {
		if(err) {
			console.log(err);
			return res.send(err);
		}
		if(books) {
			books.numofcopies = books.numofcopies + req.body.copies;
			books.save(function(err) {
				if(err)
					return res.end(err);
				return res.end("Books entries have been updated");
			});
		}
		else {
			book.save(function(err) {
				return res.send("Book have been saved");
			});
		}
	});
});

router.post('/bookreturn', function(req, res, next){
	mongoose.connect('mongodb://user:user@ds015760.mlab.com:15760/librarymanagement');

	var rollnum  = req.body.rollno;
	var isbnno = req.body.isbn;
	var deadline = new Date();
	var numdaystoadd = 30;

	User.findOne({rollno:req.body.rollno}, function(err,user) {
		var i = 0;
		for(i = 0; i < user.books.length; i++) {
			if(user.books[i].ISBN == req.body.isbn) {
				break;
			}
		}
		delete user.books[i];
		user.save(function(err) {
			if(err) {
				return res.end("Cannot return book");
			}
			else {
				deadline.setDate(user.book.issuedate + numdaystoadd);
				var fine = Date.today() - deadline;
				user.fine = fine;
				return res.render('Bookreturn', {data: user})
			}
		})
	});
});

module.exports = router;