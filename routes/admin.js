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
module.exports = router;