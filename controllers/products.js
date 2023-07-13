const catchErrors = require("../error/catch-errors")
const {StatusCodes, ReasonPhrases} = require("http-status-codes")
const Product = require("../models/Product")

const getAllProducts = async (req,res) => {
    const product = await Product.find({createdBy: req.user.userID})
    res.status(StatusCodes.OK).json({product, nbHits:product.length})
}
const createProduct = async (req,res) => {
    const product = await Product.create({...req.body, createdBy: req.user.userID})
    res.status(StatusCodes.CREATED).json({product})
}
const getProduct = async (req,res) => {
    const product = await Product.findOne({_id: req.params.productID, createdBy: req.user.userID})
    if(!product){
        throw catchErrors(`Could not find the product with proven id: ${req.params.productID}`,StatusCodes.BAD_REQUEST)
    }
    res.status(StatusCodes.OK).json(product)
}

const updateProduct = async (req,res) => {
    const product = await Product.findOneAndUpdate({_id: req.params.productID, createdBy: req.user.userID}, req.body, {new: true})
    if(!product){
        throw catchErrors(`Could not find the product with proven id: ${req.params.productID}`,StatusCodes.BAD_REQUEST)
    }
    res.status(StatusCodes.OK).json(product)
}
const deleteProduct = async (req,res) => {
    const product = await Product.findOneAndDelete({_id: req.params.productID, createdBy: req.user.userID})
    if(!product){
        throw catchErrors(`Could not find the product with proven id: ${req.params.productID}`,StatusCodes.BAD_REQUEST)
    }
    res.status(StatusCodes.OK).json({msg: "Successfully deleted"})
    
}


module.exports = {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}