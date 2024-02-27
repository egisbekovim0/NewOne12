import mongoose from "mongoose";

const Schema = mongoose.Schema

const muscleTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

export default mongoose.model("MuscleType", muscleTypeSchema)
