const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");   // uploads folder
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        );
    }
});

const upload = multer({
    storage: storage
});

// Route
router.put("/", upload.single("image"), async (req, res) => {
    try {

        if (req.file) {
            res.json({
                message: "Uploaded Successfully",
                filePath: req.file.path
            });
        } else {
            res.status(400).json({ message: "No File Uploaded" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
