const express = require("express")
const cors = require("cors")
require("dotenv").config()
const path = require("path")

// DB Connect
const ConnectAtlas = require("./Config/db")
ConnectAtlas()

// Routes
const ProductRoute = require("./Routes/ProductRoutes")
const userRoutes = require("./Routes/userRoute")
const imageRoute = require("./Middleware/upload")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Root
app.get("/", (req,res)=>{
    res.json({ message : "Server Setup is Ready" })
})

// Routes
app.use("/api/product", ProductRoute)
app.use("/api/user", userRoutes)
app.use("/api/upload", imageRoute)

// Static uploads
app.use("/uploads", express.static(path.join(__dirname,"uploads")))

app.listen(process.env.PORT, ()=>{
    console.log(`Server Running → http://localhost:${process.env.PORT}`)
})
