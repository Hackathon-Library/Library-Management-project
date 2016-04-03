var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookSchema = new Schema({
	name:String,
	ISBN:Number,
	authorname:String,
	publisher:String,
	numofcopies:Number
});
module.exports = mongoose.model('Bser',userSchema);