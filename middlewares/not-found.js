const {StatusCodes} = require("http-status-codes")
const notFound = (req,res) => {
    res.status(StatusCodes.NOT_FOUND).send("Page is Not Found!")
}

module.exports = notFound