const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');


const auth = async (req, res, next)=>{
    //check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid');
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(payload.id).select('-clientSecret');
        req.user = {userId:payload.userId, companyName:payload.companyName};
        next(); 

    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }

}

module.exports = auth;