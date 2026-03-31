const express = require("express")
const router = express.Router()
const userController = require("../Controller/userController")

// verify  Token middle ware 
// const tokenVerify = require("../Middleware/Auth")

router.get("/" ,userController.getAllUsers)
router.post("/",userController.createUser)
router.delete("/:id",userController.deleteUser)
router.put("/:id",userController.updateUser)
// make login 
router.post("/login",userController.loginUser)

module.exports = router

