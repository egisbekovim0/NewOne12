import mongoose from "mongoose";

const Schema = mongoose.Schema

const burnedCalorieSchema = new Schema({
    burnedCalorie: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    activityid: {
        type: String,
        required: true
    },
    activitymin: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
})

export default mongoose.model("BurnedCalorieData", burnedCalorieSchema)
