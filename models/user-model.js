const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },

    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
})
const owner = mongoose.model("owner", ownerSchema)
module.exports = owner
