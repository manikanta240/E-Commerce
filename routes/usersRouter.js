const express = require("express")
const router = express.Router()
const { registerUser, loginUser, logOut } = require("../controllers/authenticationcontroller")
router.get("/", (req, res) => {
    res.send("working")
})
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logOut", logOut);

module.exports = router