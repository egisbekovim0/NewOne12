import mongoose from "mongoose";

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    order_date: {
        type: Date,
        required: true
    },
    products: [ 
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true, 
            }
        }
    ],
})

export default mongoose.model("Order", orderSchema)