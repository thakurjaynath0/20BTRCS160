const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
	companyName: {
		type: String,
		required: true
	},
	ownerName: {
		type: String,
		required: true
	},
	rollNo: {
		type: String,
		required: true
	},
	ownerEmail: {
		type: String,
		required: true
	},
	accessCode: {
		type: String,
		required: true
	},
	clientSecret: {
		type: String,
	}
}, {timestamps: true});

UserSchema.pre('save', async function(next){
    if(this.isNew){
		this.clientSecret = Math.random().toString(36).slice(-10);
	}
	next()
});

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id, companyName: this.companyName}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

module.exports = mongoose.model('User', UserSchema);

