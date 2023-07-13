const { StatusCodes } = require("http-status-codes")
const errorHandlerMiddleware = (err,req,res,next) => {
    if(err.status){
        return res.status(err.status).json({msg: err.message})
    }
    if(err.name === "CastError"){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "Could Not find the task with proven id: " + err.value})
    }
    if(err.code === 11000){
        res.status(StatusCodes.BAD_REQUEST).json({msg: `The email: ${err.keyValue.email} is already in use`})
    }
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})

}

module.exports = errorHandlerMiddleware