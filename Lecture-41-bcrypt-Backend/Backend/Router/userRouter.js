const userController = require("../Controller/userController")
const express = require("express")
const router = express.Router();

router.get("/", userController.AllData)
router.post("/" , userController.createUser)
router.put("/:id",userController.updateUser)
router.delete("/:id",userController.deleteUser)

router.post("/login",userController.loginUser)

module.exports = router