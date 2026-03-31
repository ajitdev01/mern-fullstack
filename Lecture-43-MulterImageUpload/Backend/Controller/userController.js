const userC = require("../Model/usersModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userC.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ceateuser 
exports.createUser = async (req, res) => {
    try {
        const { name, email, role, salary, bihver, password, image } = req.body;
        const hasedPassword = await bcrypt.hash(password, 10);
        const newuser = await userC({
            name,
            email,
            role,
            salary,
            bihver,
            password: hasedPassword,
            image: image || ""
        })
        newuser.save()
        res.status(200).json({
            message: "User Added SuccessFully",
            User: newuser
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// delete user 
exports.deleteUser = async (req, res) => {
    try {
        const deleteuser = await userC.findByIdAndDelete(req.params.id)
        if (deleteuser) {
            res.status(200).json({
                message: "Delete User SuccessFull ",
                DeletedUser: deleteuser
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// update user  
exports.updateUser = async (req, res) => {
    try {
        const updateUser = await userC.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (updateUser) {
            res.status(200).json(
                {
                    message: "Updated User SuccessFully",
                    UpdatedUser: updateUser
                })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// login user 
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await userC.findOne({ email })
        if (!userFound) {
            return res.status(500).json({ message: "User Not Found" })
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(500).json({ message: "Invaild Password" })
        }

        const token = jwt.sign(
            {
                name: userFound.name,
                userId: userFound._id,
                role: userFound.role,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        )

        res.status(200).json({
            message: "Login SuccessFully ",
            name: userFound.name,
            userId: userFound._id,
            role: userFound.role,
            token:token

        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
