const mongoose = require("mongoose")

// conected Monngose 

const ConnectAtlas = async () =>{
    try {
        mongoose.connect(process.env.MONGOOSE_URI)
        console.log("Atlas is Connted")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = ConnectAtlas
