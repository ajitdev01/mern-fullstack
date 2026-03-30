const userModel = require("../Model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* =========================
   GET ALL USERS
========================= */
exports.AllData = async (req, res) => {
    try {
        const allUsers = await userModel.find().select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   CREATE USER
========================= */
exports.createUser = async (req, res) => {
    try {
        const { name, email, role, salary, bihver, password } = req.body;

        // Check existing email
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            role,
            salary,
            bihver,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User added successfully",
            userData: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   DELETE USER
========================= */
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   UPDATE USER
========================= */
exports.updateUser = async (req, res) => {
    try {
        const { name, email, role, salary, bihver, password } = req.body;

        const updateData = { name, email, role, salary, bihver };

        if (password) {
            updateData.password = await bcryptjs.hash(password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//    LOGIN USER
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(500).json({ message: "Invalid email" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).json({ message: "Invalid  password" });
        }
        const token = jwt.sign(
            {userId: user._id,
            role: user.role,
            name:user.name},
            process.env.JWT_SICKET_KET,
            {expiresIn:"1h"}
        )
        res.status(200).json({
            message: "Login successful",
            userId: user._id,
            role: user.role,
            name:user.name,
            token : token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};