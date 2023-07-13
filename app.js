// Async Errors 
require("express-async-errors")
require("dotenv").config()

const express = require("express")
const connectDB = require("./db/connect")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const notFound = require("./middlewares/not-found")
const authRouter = require("./routes/users")
const productsRouter = require("./routes/products")
const auth = require("./middlewares/authentication")
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/products", auth, productsRouter)


// customMiddlewares
app.use(errorHandlerMiddleware)
app.use(notFound)

const port = process.env.PORT
const url = process.env.DATABASE_URI
const start = async () => {
    try {
        await connectDB(url)
        app.listen(port, ()=> console.log(`Server is listening at the port: ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()


