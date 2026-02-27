const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")
router.get("/", (req, res) => {
    res.send("working")
})
router.post("/register", (req, res) => {
    try {
        let { fullname, email, password } = req.body
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    res.send(err)
                } else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    // res.send(user);
                    let token = jwt.sign({ email, id: user._id }, "tony");
                    res.cookie("token", token)
                    res.send("user created successfully");
                }
            })
        })

    } catch (err) {
        res.status(500).send(err.message)
    }
})
module.exports = router