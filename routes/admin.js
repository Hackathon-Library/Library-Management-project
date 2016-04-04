var express = require('express');
var router = express.Router();
var path = require('path');
var Books = require('../app/model/Books')
var User = require('../app/model/user');

router.post('/bookissue', function(req, res, next){
	var rollno = req.body.rollno;

	Books.findOne({ISBN:req.body.isbn}, function(err,book) {
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
							res.end("Cannot issue book");
						else {
							book.numofcopies = book.numofcopies - 1;
							book.save(function(err) {
								res.end("Book have been issued");
							});	
						}
					});
			});
		}
	});
});

router.post('/newbook', function(req, res, next){
	var book = new Books();
	book.bookname = req.body.bookname;
	book.authorname = req.body.author;
	book.ISBN = req.body.isbn;
	book.numofcopies = req.body.copies;

	Books.findOne({ISBN:req.body.isbn}, function(err,books) {
		if(err) {
			console.log(err);
			return res.send(err);
		}
		if(books) {
			books.numofcopies = Number(books.numofcopies) + Number(req.body.copies);
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

	var deadline = new Date();
	var numdaystoadd = 30;

	Books.findOne({ISBN:req.body.isbn}, function(err,book) {
		if(err)
			return res.end("Cannot return book some internal error occured");

		User.findOne({rollno:req.body.rollno}, function(err,user) {
			user.books.pull({_id: book.id});
			user.save(function(err) {
				if(err) {
					return res.end("Cannot return book");
				}
				else {
					// deadline.setDate(user.book.issuedate + numdaystoadd);
					// var fine = Date.today() - deadline;
					// user.fine = fine;
					return res.render('BookReturn', {data: user})
				}
			})
		});

		book.numofcopies = book.numofcopies + 1;
		book.save();
	});
});

module.exports = router;