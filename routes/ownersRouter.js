const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/login", (req, res) => {
    res.render("owner-login");
});

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        const owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(503).send("Owner already exists");
        }
        const { fullname, email, password } = req.body;
        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    });
}

module.exports = router;