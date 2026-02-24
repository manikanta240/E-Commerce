
const { default: string } = require('figlet/fonts/babyface-lame');
const mongoose = require('mongoose');
const Product = require('./product-model');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: string,
    password: string,
    Products: {
        type: Array,
        default: []
    }, picture: string,
    gstin: number
})
const User = mongoose.model("User", userSchema)
module.exports = User
