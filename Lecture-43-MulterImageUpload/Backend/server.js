const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const path = require("path")
// get users Router
const userRoute = require("./Router/usersRouter")
// image Route 
const imageUpload = require("./Router/ImageRoute")
// image Update Route 
const updateRoute = require("./Router/PutRouter")

// make a app middleware
const app = express()
app.use(express.json())
app.use(cors())
// connect Mongoose 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Atlas is Connect")
    })
    .catch((eror) => {
        console.log(eror)
    })


app.get("/", (req, res) => {
    res.json({ message: "Server Start" })
})

// get all users 
app.use("/api/users", userRoute)
// app uploed image
app.use('/api/upload', imageUpload);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app update image
app.use("/api/update",updateRoute)
app.use('/update', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.PORT, () => {
    console.log(`Server is Runing on http://localhost:${process.env.PORT}`)
})

