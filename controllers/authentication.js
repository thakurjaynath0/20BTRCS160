const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async(req,res)=>{
	const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;
    const user = await User.create({ companyName, ownerName, rollNo, ownerEmail, accessCode }); 
    res.status(StatusCodes.CREATED).json({companyName: user.companyName, clientId: user._id, clientSecret: user.clientSecret});
}

const login = async(req,res)=>{
    const { companyName, ownerName, rollNo, ownerEmail, accessCode, clientSecret } = req.body;

    if(!companyName || !ownerName || !rollNo || !ownerEmail || !accessCode || !clientSecret){
        throw new BadRequestError('Please provide email and password');
    } 

    const user = await User.findOne({companyName, ownerName, rollNo, ownerEmail, accessCode, clientSecret});
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = user.createJWT();
    const expiry = Date.now() + (30*60*1000);
    res.status(StatusCodes.OK).json({token_type: "Bearer", access_token: token, expires_in: expiry}); 
}

module.exports = {
    register,
    login,
}