const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect("mongodb://localhost:27017/fristdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
})

const User = mongoose.model( userSchema,"users_table",)
     
app.get("/api/users", async (req, res) => {
  const users = await User.find()
  res.json(users)
})

app.get("/", async (req, res) => {
  const users = await User.find()
  res.json(users)
})

app.listen(2010, () => {
  console.log("Server running on http://localhost:2010")
})


