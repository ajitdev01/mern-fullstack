const express = require("express")
const Router = express.Router()
const productController = require("../Controller/ProductController")

// gets
Router.get("/",productController.getProduct)
Router.get("/:id",productController.getProductById)
// delete 
Router.delete("/:id",productController.deleteById)
// create post 
Router.post("/",productController.createProduct)
// edit product 
Router.put("/:id",productController.updateProduct)
module.exports = Router
