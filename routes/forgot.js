var express = require('express');
var router = express.Router();
var path = require('path');
var Books = require('../app/model/Books')
var User = require('../app/model/user');

router.get('/', function(req,res,next) {
	res.sendFile(path.join(__dirname, '../public/forgot.html'));
});

module.exports = router;