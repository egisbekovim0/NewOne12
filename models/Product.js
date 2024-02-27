import mongoose from "mongoose";

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    productCategory:{
        type: mongoose.Types.ObjectId,
        ref: "ProductCategory",
        required: true,
    },
    photo: {
        type: String, 
        required: true,
    },
})

export default mongoose.model("Product", productSchema)
