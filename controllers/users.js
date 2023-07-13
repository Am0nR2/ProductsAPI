const User = require("../models/User")
const catchErrors = require("../error/catch-errors")
const {StatusCodes, ReasonPhrases} = require("http-status-codes")

const register = async (req,res) => {
    const user = await User.create(req.body)
    const token = user.createToken()
    res.status(StatusCodes.CREATED).json({user: user, token}) 
}
const login = async (req,res) => {
    const {email, password} = req.body
    
    const user = await User.findOne({email})
    if(!user){
        throw catchErrors("User not found", StatusCodes.BAD_REQUEST)
    }
    const isMatch = await user.comparePassword(password)
    
    if(!isMatch){
        throw catchErrors(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
    }
    console.log(isMatch)
    const token = user.createToken()
    res.status(StatusCodes.OK).json({token, msg: `Walcome to your page mr: ${user.name}`})
    

}

module.exports = {register, login}