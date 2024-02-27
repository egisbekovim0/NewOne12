import mongoose from "mongoose";

const Schema = mongoose.Schema

const productCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

export default mongoose.model("ProductCategory", productCategorySchema)
