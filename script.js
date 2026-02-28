const express = require("express")
const app = express()
const path = require("path")
const db = require("./config/mongoose-connction")
const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")
const index = require("./routes/index")
const expresssession = require("express-session")
const cookieParser = require("cookie-parser")
const { isLoggedIn } = require("./middleware/isLoggedIn")
const flash = require("connect-flash")
app.use(cookieParser())
app.use(expresssession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_KEY,
}))
app.use(flash())

require("dotenv").config();
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
    console.log("Server is running on port 3000")
})