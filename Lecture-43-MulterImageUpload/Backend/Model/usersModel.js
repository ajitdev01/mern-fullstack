const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    name:String,
    email:String,
    role:String,
    salary:Number,
    bihver:String,
    password:String,
    image:String
})

module.exports = mongoose.model("user",userShema)
