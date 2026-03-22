const Employess = require("../models/Employess");

exports.getAllEmps = async (req, res) => {
  try {
    const emp = await Employess.find();
    res.status(200).json(emp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
