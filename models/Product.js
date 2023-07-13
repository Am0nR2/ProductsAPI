const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the product"],
        maxlength: [100, "Product Name cannot be longer than 100 characters..."]
    },
    price:{
        type: Number,
        required: [true, "Please enter the price of the product"],
    },
    company: {
        type: String,
        default : "Personal",
        maxlength: [100, "Company name cannot be longer than 100 characters"]
    },
    rating: {
        type: Number,
        default: 0,
        max: 5
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"] 
    }
},{timestamps:true})


module.exports = mongoose.model("Product", ProductSchema)
// "name": "armchair",
// "price": 125,
// "company": "marcos",
// "rating": 4.8