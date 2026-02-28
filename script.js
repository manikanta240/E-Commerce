require("dotenv").config();
const express = require("express")
const app = express()
const path = require("path")
const db = require("./config/mongoose-connction")
const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")
const index = require("./routes/index")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const isLoggedIn = require("./middlewares/isLoggedin")
const flash = require("flash")
app.use(cookieParser())
app.use(session({
    secret: process.env.JWT_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use("/", index)
app.use("/owners", ownersRouter)
app.use("/products", productsRouter)
app.use("/users", usersRouter)

app.listen(3000, () => {
    console.log(process.env.JWT_KEY)
    console.log("SESSION:", process.env.SESSION_KEY)
    console.log("Server is running on port 3000")
})