const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a user name..."],
        minlength: 3,
        maxlength: 24
    }, 
    email: {
        type: String,
        required: [true, "Please enter an email..."],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        unique: true
    }, 
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 6,
        maxlength: 24
    }
})

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createToken = function(){
    return jwt.sign({name: this.name, userId: this.id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

UserSchema.methods.comparePassword = async function(pass){
    return await bcrypt.compare(pass, this.password )
}
// UserSchema.methods.comparePasswords = async function(upcomingPassword){
//     return await bcrypt.compare(upcomingPassword, this.password)
// }

module.exports = mongoose.model("User", UserSchema)
