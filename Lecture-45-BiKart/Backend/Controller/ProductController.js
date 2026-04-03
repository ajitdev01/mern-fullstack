const mongoose = require("mongoose");
const productModel = require("../Model/ProductModel");


// =========================
// GET ALL PRODUCTS
// =========================
exports.getProduct = async (req, res) => {
    try {

        const products = await productModel.find();

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// GET PRODUCT BY ID
// =========================
exports.getProductById = async (req, res) => {
   try {
        const productsId = await productModel.findById(req.params.id);
        res.status(200).json(productsId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// =========================
// CREATE PRODUCT
// =========================
exports.createProduct = async (req, res) => {
    try {

        const newProduct = await productModel.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            product: newProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// UPDATE PRODUCT
// =========================
exports.updateProduct = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// DELETE PRODUCT
// =========================
exports.deleteById = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
            product: deletedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

