var mongoose = require('mongoose');
var bookschema = require('./Books');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name:String,
	rollno:{type: String, required: true, index: { unique: true }},
	branch:String,
	email:{type:String, index: {unique:true}},
	username:{type:String, index: {unique:true}},
	password:String,
	role:String,
	books: [{
		book: {
			type:Schema.Types.ObjectId,
			ref: 'Book'
		},
		issuedate: Date
	}]

});

module.exports = mongoose.model('User',userSchema);