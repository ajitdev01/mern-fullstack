const express = require("express");
const router = express.Router();
const empController = require("../controllers/empController");

// GET all employees
router.get("/", empController.getAllEmps);

module.exports = router;
