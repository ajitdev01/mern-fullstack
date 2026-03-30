const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const jwt = require("jsonwebtoken")


// all users data 
const UsersRoute = require("./Router/userRouter")
const uploadRouter = require("./Router/uplodeRouter")


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Atlas is Connted")
})
.catch((error) =>{
    console.log(`Error By Atlas ${error}`)
})

app.get("/",(req,res) =>{
    res.json({message : "MVC BICRIPY START"})
})

// route
app.get("/jwt",(req,res) =>{
    const token =jwt.sign(
        {name:"Nilam"},
        "SECRECT_KEY",
        {expiresIn:"1h"}
    )
    res.json({
        message : "Welcome to jwt Setup",
        token : token
    })
})


// users Path
app.use("/api/users" , UsersRoute)
app.use("/api/upload",uploadRouter)

app.listen(process.env.PORT , () =>{
    console.log(`Server Is Runing On http://localhost:${process.env.PORT}`)
})


