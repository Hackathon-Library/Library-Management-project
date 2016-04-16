var mongoose = require('mongoose');
var bookschema = require('./Books');
var bcrypt = require('bcrypt-nodejs');
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
	}],
	resetPasswordToken: String,
	resetPasswordExpires: Date

});

userSchema.pre('save', function(next) {
	var user = this;
	var SALT_FACTOR = 5;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(userPassword) {
	var user = this;
	return bcrypt.compareSync(userPassword, user.password);
};

module.exports = mongoose.model('User',userSchema);