const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

require("./DB/mongoose")

const userRouter = require("./routes/user")
const blogRouter = require("./routes/blog")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use(userRouter)
app.use(blogRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log("server is up on port:", port)
})