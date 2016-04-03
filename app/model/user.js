var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	name:String,
	rollno:Number,
	branch:String,
	email:{type:String, index: {unique:true}},
	username:{type:String, index: {unique:true}},
	password:String,
	role:String,
	book: {
		bookname: String,
		issueddate:Date
	}

});
module.exports = mongoose.model('User',userSchema);