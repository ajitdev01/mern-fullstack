const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json()
)

mongoose
  .connect("Add Paste Your MongoDb URI")
  .then(() => console.log("Atlas is Connected"))
  .catch((error) => console.log(error))


const staffSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    department: String,
    salary: Number
})


const Staff = mongoose.model("staff", staffSchema)
app.get("/", (req, res) => {
    res.json("Server is Runing ... ")
})


app.get("/api/staffs", async (req,res) =>{
    const staffs = await Staff.find()
    res.json(staffs)
})






app.listen(2010, () => {
    console.log("Server is runing on http://localhost:2010")
})




