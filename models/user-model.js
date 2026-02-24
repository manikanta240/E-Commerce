const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/e-commerce')
const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isadmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: string
})
const User = mongoose.model("User", userSchema)
module.exports = User
