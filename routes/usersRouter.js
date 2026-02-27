const express = require("express")
const router = express.Router()
const userModel = require("../models/user-model")
router.get("/", (req, res) => {
    res.send("working")
})
router.post("/register", async (req, res) => {
    try {
        let { fullname, email, password } = req.body
        let user = await userModel.create({
            fullname,
            email,
            password
        })
        res.send(user);
        console.log(user);

    } catch (err) {
        res.status(500).send(err.message)
    }
})
module.exports = router