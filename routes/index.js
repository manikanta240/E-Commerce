const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
router.get("/", (req, res) => {
    const flashMessage = req.flash("error");
    res.render("index", { flashMessage, cartCount: undefined });
});
router.get("/shop", isLoggedIn, async (req, res) => {
    try {
        const products = await productModel.find();
        const cartCount = req.session.cart ? req.session.cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
        res.render("shop", { products, cartCount });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get("/cart", isLoggedIn, (req, res) => {
    const cart = req.session.cart || [];
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const platformFee = 10;
    const shippingFee = 0;
    const total = subtotal + platformFee + shippingFee;
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    res.render("cart", {
        cart,
        subtotal,
        platformFee,
        shippingFee,
        total,
        cartCount,
    });
});

router.get("/cart/add/:id", isLoggedIn, async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            req.flash("error", "Product not found");
            return res.redirect("/shop");
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        const existingIndex = req.session.cart.findIndex(
            (item) => item.productId.toString() === product._id.toString()
        );

        if (existingIndex > -1) {
            req.session.cart[existingIndex].quantity += 1;
        } else {
            req.session.cart.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: 1,
            });
        }

        res.redirect("/cart");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/cart/remove/:id", isLoggedIn, (req, res) => {
    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(
            (item) => item.productId.toString() !== req.params.id.toString()
        );
    }
    res.redirect("/cart");
});

router.get("/cart/update/:id/:action", isLoggedIn, async (req, res) => {
    try {
        const { id, action } = req.params;
        if (!req.session.cart) {
            return res.redirect("/cart");
        }
        const itemIndex = req.session.cart.findIndex(
            (item) => item.productId.toString() === id.toString()
        );
        if (itemIndex > -1) {
            if (action === "increase") {
                req.session.cart[itemIndex].quantity += 1;
            } else if (action === "decrease" && req.session.cart[itemIndex].quantity > 1) {
                req.session.cart[itemIndex].quantity -= 1;
            }
        }
        res.redirect("/cart");
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get("/logout", isLoggedIn, (req, res) => {
    res.cookie("token", "");
    req.session.cart = [];
    res.redirect("/");
});

module.exports = router;