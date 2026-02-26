const mongoose = require('mongoose');
const config = require("./development.json")
const dbgr = require("debug")("development:mongoose")

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        dbgr("Connected to MongoDB")
    })
    .catch((err) => {
        dbgr("Error connecting to MongoDB", err)
    })
module.exports = mongoose.connection