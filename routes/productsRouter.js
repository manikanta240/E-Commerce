const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isLoggedIn } = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get("/admin", isLoggedIn, async (req, res) => {
    try {
        const products = await productModel.find();
        const cartCount = req.session.cart ? req.session.cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
        res.render("admin", { products, cartCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/create", isLoggedIn, (req, res) => {
    const success = req.flash("success")
    const error = req.flash("error")
    const cartCount = req.session.cart ? req.session.cart.reduce((sum, item) => sum + item.quantity, 0) : 0
    res.render("createproducts", { success, error, cartCount })
});

router.post("/create", isLoggedIn, upload.single("image"), async (req, res) => {
    try {
        const { name, price } = req.body
        if (!name || !price) {
            req.flash("error", "Product name and price are required")
            return res.redirect("/products/create")
        }
        await productModel.create({
            name,
            price: Number(price) || 0,
            discount: Number(req.body.discount) || 0,
            bgcolor: req.body.bgcolor || "#f5f5f5",
            panelcolor: req.body.panelcolor || "#ffffff",
            textcolor: req.body.textcolor || "#000000",
            image: req.file ? req.file.buffer : undefined,
        })
        req.flash("success", "Product created successfully")
        res.redirect("/products/create")
    } catch (err) {
        req.flash("error", err.message || "Failed to create product")
        res.redirect("/products/create")
    }
});

module.exports = router;