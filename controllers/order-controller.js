import Order from "../models/Order.js";
import mongoose from "mongoose";


export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        return res.status(200).json({ orders });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const addOrder = async (req, res, next) => {
    const { user, status, order_date, products } = req.body;

    try {
        const order = new Order({
            user,
            status,
            order_date,
            products
        });

        await order.save();

        return res.status(200).json({ order });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateOrder = async (req, res, next) => {
    const { status, order_date, products} = req.body;
    const orderId = req.params.id;

    try {
        const order = await Order.findByIdAndUpdate(orderId, {
            status,
            order_date,
            products
        });

        return res.status(200).json({ order });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getOrderById = async (req, res, next) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ order });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteOrder = async (req, res, next) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getOrderByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const order = await Order.find(userId);
        if (!order) {
            return res.status(404).json({ message: "User exercise not found" });
        }
        return res.status(200).json({ order });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error getting by user" });
    }
};

export const getOrdersWithUserDetails = async (req, res, next) => {
    try {
      const orders = await Order.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
          },
        },
      ]);
  
      return res.status(200).json({ orders });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const getOrdersWithinDateRange = async (req, res, next) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
  
    try {
      const orders = await Order.aggregate([
        {
          $match: {
            order_date: { $gte: startDate, $lte: endDate },
          },
        },
      ]);
  
      return res.status(200).json({ orders });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error fofo" });
    }
  };

  export const updateOrderProductsQuantity = async (req, res, next) => {
    const orderId = req.params.id;
    const productId = req.params.productId;
    const newQuantity = req.body.newQuantity;

    try {
        const result = await Order.updateOne(
            { _id: orderId, "products.product": productId },
            { $set: { "products.$.quantity": newQuantity } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: "Order or Product not found" });
        }

        return res.status(200).json({ message: "Product quantity updated successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

  