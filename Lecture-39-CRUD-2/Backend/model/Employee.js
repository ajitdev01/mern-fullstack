const mongoose = require("mongoose")
const EmployeShema = new mongoose.Schema({
    name:String,
    email:String,
    role:String
})

module.exports = mongoose.model("employee",EmployeShema)

