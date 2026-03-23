const express = require('express')
const router = express.Router()
const EmployeeController = require("../controller/EmployeeController")

router.get('/',EmployeeController.getAllEmployee)
router.post("/",EmployeeController.createEmploye)

router.delete('/:id',EmployeeController.deleteEmpbyId)

module.exports = router