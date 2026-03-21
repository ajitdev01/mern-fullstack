const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config()

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.atlas_url)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((error) => console.error("MongoDB Error:", error));

const staffSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    department: String,
    salary: Number
})

const Staff = mongoose.model("staff", staffSchema);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});


app.get("/api/staffs", async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.json(staffs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staffs" });
  }
});




app.listen(process.env.port, () => {
  console.log(`Server running at http://localhost:${process.env.port}`);
});








