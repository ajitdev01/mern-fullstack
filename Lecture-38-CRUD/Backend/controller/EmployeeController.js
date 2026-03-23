const Employee = require("../model/Employee")

exports.getAllEmployee = async (req,res) =>{
    try {
        const employee = await Employee.find()
        res.status(200).json(employee)
    } catch (error) {
        console.log(error,"Error Found Buddy")
    }
}

exports.createEmploye = async (req,res) =>{
    try {
        const newEmployee = await Employee(req.body)
        newEmployee.save()
        res.status(200).json({message:"Employee Added"})
    } catch (error) {
        console.log(error,"Error Found my Team")
    }
}



exports.deleteEmpbyId = async (req , res) => {
    try {
        const deleteEmploye = await Employee.findByIdAndDelete(req.params.id)
        if(deleteEmploye){
            res.status(200).json({message:"Employee Delteed"})
        }
    } catch (error) {
      res.status(500).json({message:error.message})
    }
}


