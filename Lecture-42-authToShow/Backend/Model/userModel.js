const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    name:String,
    email:String,
    role:String,
    salary:Number,
    bihver:String,
    password:String
})
module.exports = mongoose.model("user",userModel);

