
const { default: string } = require('figlet/fonts/babyface-lame');
const mongoose = require('mongoose');

const Product = require('./product-model');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: String,
    password: String,
    Products: {
        type: Array,
        default: []
    }, picture: String,
    gstin: Number
})
const own = mongoose.model("Owner", ownerSchema)
module.exports = own
