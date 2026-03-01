const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")
const generateToken = require("../utils/tokengenerate")
module.exports.registerUser = async function (req, res) {
    try {
        const { fullname, email, password } = req.body
        if (!fullname || !email || !password) {
            req.flash("error", "All fields are required")
            return res.redirect("/")
        }
        const user = await userModel.findOne({ email })
        if (user) {
            req.flash("error", "User already exists")
            return res.redirect("/")
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    req.flash("error", "Registration failed")
                    return res.redirect("/")
                }
                await userModel.create({ fullname, email, password: hash })
                const newUser = await userModel.findOne({ email })
                const token = generateToken(newUser)
                res.cookie("token", token)
                res.redirect("/shop")
            })
        })
    } catch (err) {
        req.flash("error", "Registration failed")
        res.redirect("/")
    }
}
module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            req.flash("error", "Email and password are required")
            return res.redirect("/")
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            req.flash("error", "Invalid email or password")
            return res.redirect("/")
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = generateToken(user)
                res.cookie("token", token)
                res.redirect("/shop")
            } else {
                req.flash("error", "Invalid email or password")
                res.redirect("/")
            }
        })
    } catch (err) {
        req.flash("error", "Login failed")
        res.redirect("/")
    }
}
module.exports.logOut = async function (req, res) {
    res.cookie("token", "")
    res.redirect("/")
}