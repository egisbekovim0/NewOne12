import mongoose from "mongoose";

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    name_secondary: {
        type: String,   
        required: true
    },
    description: {
        type: String,
        required: true
    },
    description_secondary: {
        type: String,   
        required: true
    },
    exerciseType:{
        type: mongoose.Types.ObjectId,
        ref: "ExerciseType",
        required: true,
    },
    superSkill: {
        type: String,
        default: 'none',
        required: true
    },
    muscleType:{
        type: mongoose.Types.ObjectId,
        ref: "MuscleType",
        required: true,
    },
    itemRole: {
        type: String,
        required: true
    },
    mainBoost: {
        type: Number,
        required: true
    },
    smallBoost: {
        type: Number,
        required: true
    },
    foodProduce: {
        type: Number,
        required: true
    },
    xpProduce: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    updateCost: {
        type: Number,
        required: true
    }
})

export default mongoose.model("Exercise", exerciseSchema)
