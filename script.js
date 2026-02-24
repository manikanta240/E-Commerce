const express = require("express")
const app = express()
const path = require("path")
const db = require("./config/mongoose-connction")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("Welcome to the E-Commerce API")
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})