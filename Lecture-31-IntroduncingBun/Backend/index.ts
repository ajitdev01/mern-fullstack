import express from "express"
const app = express()

app.get("/",(req,res) =>{
    res.send("Welcome To I Using Bun Creating Backend")
})

app.get("/api",(req,res) =>{
    res.send("This is api send send ...")
})

app.listen(2000,()=>{
    console.log("Server is runing on http://localhost:2000")
})