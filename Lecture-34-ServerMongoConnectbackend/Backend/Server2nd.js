const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());


// other Db ....
mongoose
  .connect(
    "Add Paste Your MongoDb URI"
  )
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((error) => console.error(error));


// tests Scheme
const testSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const test = mongoose.model("emp",testSchema);

app.get("/",(req,res) =>{
    res.json({message:"Welcme to Server2nd"})
})

// test data 
app.get("/api/test",async (req,res) =>{
    const tests = await test.find();
    res.json(tests)
})

app.listen(3000 , () =>{
    console.log("Server is runing on http://localhost:3000")
})

