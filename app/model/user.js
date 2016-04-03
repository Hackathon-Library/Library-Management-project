var mongoose = require('mongoose');
var bookschema = require('./Books');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name:String,
	rollno:Number,
	branch:String,
	email:{type:String, index: {unique:true}},
	username:{type:String, index: {unique:true}},
	password:String,
	role:String,
	books: [
		type:mongoose.Schema.Types.ObjectId,
		ref: 'Book'
	]

});

module.exports = mongoose.model('User',userSchema);