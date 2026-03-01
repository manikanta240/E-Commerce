const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        default: [],
    },
    picture: String,
    gstin: Number,
});

const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;
