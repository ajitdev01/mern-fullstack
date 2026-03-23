const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
// employee Router
const employeeRoutes = require("./router/EmployeRoutes")


require('dotenv').config()
// database connet
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("Atlas is Connected")
})
.catch((error) =>{
    console.log(error,"Error Found fix team ")
})

const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res) =>{
    res.json({Message:"Welcome to Runing server"})
})
// all Crud in one url

app.use("/api/emp",employeeRoutes)

app.listen(process.env.PORT , () =>{
    console.log(`Server is runing on http://localhost:${process.env.PORT}`)
})



