const User = require("../Model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// ================= CREATE USER (REGISTER) =================
exports.createUser = async (req, res) => {
    try {

        const { name, email, password, mobileNumber, image } = req.body;

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // 🔥 HASH PASSWORD (THIS WAS MISSING)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,   // save hashed password
            mobileNumber,
            image
        });

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= LOGIN USER =================
exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        // check user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password !" })
        }

        // generate token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_KEY,
            { expiresIn: "1hr" }
        )

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                imagePath: user.image
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}