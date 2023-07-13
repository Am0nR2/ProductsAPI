const catchErrors = (msg,status) =>{
    const error = new Error()
    error.message = msg
    error.status = status
    return error
} 

module.exports = catchErrors