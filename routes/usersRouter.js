const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const userModel = require("../models/user-model")
router.get("/", (req, res) => {
    res.send("working")
})
router.post("/register", async (req, res) => {
    try {
        let { fullname, email, password } = req.body
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(hash)
                }
            })
        })

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