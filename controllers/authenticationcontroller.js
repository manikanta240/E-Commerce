const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")
const generateToken = require("../utils/tokengenerate")
module.exports.registerUser = async function (req, res) {
    try {
        let { fullname, email, password } = req.body
        let user = await userModel.findOne({ email: email })
        if (user) {
            return res.status(400).send("user already exists")
        }
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
                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.send("user created successfully");
                }
            })
        })

    } catch (err) {
        res.status(500).send(err.message)
    }
}
module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email })
    if (!user) {
        return res.status(400).send("user not found")
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token)
            res.send("user logged in successfully")
        } else {
            res.status(400).send("invalid credentials")
        }
    })
}
module.exports.logOut = async function (req, res) {
    res.cookie("token", "")
    res.send("user logged out successfully")
}