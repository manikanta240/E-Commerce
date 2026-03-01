const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    image: Buffer,
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    bgcolor: {
        type: String,
        default: "#f5f5f5",
    },
    panelcolor: {
        type: String,
        default: "#ffffff",
    },
    textcolor: {
        type: String,
        default: "#000000",
    },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
