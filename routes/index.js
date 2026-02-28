const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../middlewares/isLoggedin")

router.get("/", (req, res) => {
    let flashMessage = req.flash("error")
    res.render("index", { flashMessage });
})
router.get("/shop", isLoggedIn, (req, res) => {
    res.render("shop");
})

module.exports = router
