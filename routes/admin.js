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

module.exports = router;