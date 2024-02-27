import express from 'express'
import { getAllProductCategories, addProductCategory, updateProductCategory, getProductCategoryById, deleteProductCategory } from '../controllers/product-category-controller.js'

const productCategoryRouter = express.Router()
productCategoryRouter.get("/", getAllProductCategories)
productCategoryRouter.post("/add", addProductCategory)
productCategoryRouter.put("/update/:id", updateProductCategory)
productCategoryRouter.get("/:id", getProductCategoryById)
productCategoryRouter.delete("/:id", deleteProductCategory)

export default productCategoryRouter