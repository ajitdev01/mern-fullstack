const userModel = require("../Model/userModel")

// get all users
exports.AllData = async (req,res) =>{
    try {
        const allUser = await userModel.find()
        res.status(200).json(allUser)
    } catch (error) {
        res.status(500).json({message:error})
    }
}
// createusers
exports.createUser = async (req,res) =>{
    try {
        const newUser = await userModel(req.body);
        newUser.save()
        res.status(200).json({
            message : "User Added SuccessFully",
            UserData : newUser 
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// delete User 
exports.deleteUser = async (req,res) =>{
    try {
        const deleteuser = await userModel.findByIdAndDelete(req.params.id)
        if(deleteuser){
            res.status(200).json({
                message:"Delete User Successfully",
                Delete: deleteuser
            })
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// update user
exports.updateUser = async (req,res) =>{
    try {
        const updateUser = await userModel.findByIdAndUpdate(req.params.id,req.body, {new:true})
        if(updateUser){
            res.status(200).json({
                message:"User Updated Successfully",
                UpdatedUSer : updateUser
            })
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}