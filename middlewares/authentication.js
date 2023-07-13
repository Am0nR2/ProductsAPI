const jwt = require("jsonwebtoken")
const catchErrors = require("../error/catch-errors")
const {StatusCodes, ReasonPhrases} = require("http-status-codes")
const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw catchErrors(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
    }

    const token = authHeader.split(" ")[1]
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {name: payload.user, userID: payload.userId}
        next()
    } catch (error) {
        throw catchErrors(ReasonPhrases.UNAUTHORIZED ,StatusCodes.UNAUTHORIZED)
    }
}

module.exports = auth
