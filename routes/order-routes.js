import express from 'express'
import { getAllOrders, addOrder, updateOrder, getOrderById, deleteOrder, getOrderByUserId, getOrdersWithUserDetails, getOrdersWithinDateRange, updateOrderProductsQuantity} from '../controllers/order-controller.js'

const orderRouter = express.Router()

orderRouter.get("/", getAllOrders)
orderRouter.post("/add", addOrder)
orderRouter.put("/update/:id", updateOrder)
orderRouter.get("/getByDetail", getOrdersWithUserDetails)
orderRouter.get("/getByDate", getOrdersWithinDateRange)
orderRouter.get("/:id", getOrderById)
orderRouter.delete("/:id", deleteOrder)
orderRouter.get("/user/:id", getOrderByUserId)
orderRouter.put("/:id/products/:productId/updateQuantity", updateOrderProductsQuantity);



export default orderRouter