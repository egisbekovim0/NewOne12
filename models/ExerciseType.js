import mongoose from "mongoose";

const Schema = mongoose.Schema

const exerciseTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

export default mongoose.model("ExerciseType", exerciseTypeSchema)
