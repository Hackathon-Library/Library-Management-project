var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookSchema = new Schema({
	bookname:String,
	ISBN:Number,
	authorname:String,
	publisher:String,
	numofcopies:Number
});
module.exports = mongoose.model('Book',bookSchema);