import express from 'express'
import { getAllProducts, addProduct, updateProduct, getById, deleteProduct } from '../controllers/product-controller.js'

const productRouter = express.Router()

productRouter.get("/", getAllProducts)
productRouter.post("/add", addProduct)
productRouter.put("/update/:id", updateProduct)
productRouter.get("/:id", getById)
productRouter.delete("/:id", deleteProduct)

export default productRouter