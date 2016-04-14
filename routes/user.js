var express = require('express');
var router = express.Router();
var path = require('path');
var Books = require('../app/model/Books')
var User = require('../app/model/user');

router.post('/search', function(req,res,next) {
	var bookname = req.body.bookname;
	var author = req.body.author;
	if(bookname && author) {
		Books.find({bookname:{$regex: new RegExp(bookname,"i")},authorname:{$regex: new RegExp(author,"i")}}, function(err,books) {
			if(err)
				res.end(err);
			res.render('pages/Booklist',{data:books});
		});
	}
	else if(bookname) {
		Books.find({bookname:{$regex: new RegExp(bookname,"i")}}, function(err,books) {
			if(err)
				res.end(err);
			res.render('pages/Booklist',{data:books});
		});
	}
	else if(author) {
		Books.find({authorname:{$regex: new RegExp(author,"i")}}, function(err,books) {
			if(err)
				res.end(err);
			res.render('pages/Booklist',{data:books});
		});
	}
	else
		res.end("Please enter one of the entry");
});

module.exports = router;