const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
	role:{
		type: String,
		enum:['user', 'publisher'],
		default: 'user'
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minLength: 6,
		select: false
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt:{
		type: Date,
		default:Date.now
	}
});

//Encrypt password
UserSchema.pre('save', async function(next){
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
	return jwt.sign({id: this._id}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE})
}

//match user entered password to encrypted password
UserSchema.methods.matchPassword = async function(enteredPassword){
	return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);