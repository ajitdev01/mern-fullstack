
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const employeeRoutes = require("./routes/empRoutes");



const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDb is Connected"))
.catch((Error) => console.log("Error Buddy",Error))


// Routes connected 
app.get("/",(req,res)=>{
    res.json({message:"Welcome to MVC setup"})
})


// use dirctly emp routes
app.use("/api/emp", employeeRoutes )



app.listen(process.env.PORT , ()=>{
    console.log(`Server is runing on http://localhost:${process.env.PORT}`)
})








