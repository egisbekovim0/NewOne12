import mongoose from "mongoose";

const Schema = mongoose.Schema

const enemySchema = new Schema({
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
    health: {
        type: Number,
        default: 100,
        required: true
    },
    damage: {
        type: Number,
        default: 0,
        required: true
    },
    reward: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        // required: true
    },
    ability: {
        type: String,
        default: 'none',
        required: true
    },
    enemy_level: {
        type: Number,
        default: 1,
        required: true
    }
})

export default mongoose.model("Enemy", enemySchema)
