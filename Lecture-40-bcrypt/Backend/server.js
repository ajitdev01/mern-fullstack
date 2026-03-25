const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
// all users data 
const UsersRoute = require("./Router/userRouter")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("Atlas is Connted")
})
.catch((error) =>{
    console.log(`Error By Atlas ${error}`)
})

app.get("/",(req,res) =>{
    res.json({message : "MVC BICRIPY START"})
})
// users Path
app.use("/api/users" , UsersRoute)
app.listen(process.env.PORT , () =>{
    console.log(`Server Is Runing On http://localhost:${process.env.PORT}`)
})
 
