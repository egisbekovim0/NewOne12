import mongoose from "mongoose";
import encrypt from 'mongoose-encryption';
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
        minlength: 5
    },
    role: {
        type: String,
        default: 'user',
        required: true
    },
    user_level: {
        type: Number,
        default: 1,
        required: true,
    },
    xp: {
        type: Number,
        default: 0,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
    },
    dailyXP: {
        type: Number,
        default: 0,
        required: true,
    },
    dayStreak: {
        type: Number,
        default: 0,
        required: true,
    },
    daysOfWeekTrigger: {
        type: [String],
        default: [],
        required: true,
    },
    weight: {
        type: Number,
        default: 0,
        required: true,
    },
    height: {
        type: Number,
        default: 0,
        required: true,
    },
    money: {
        type: Number,
        default: 10,
        required: true
    },
    hunger: {
        type: Number,
        default: 100,
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
    defence: {
        type: Number,
        default: 0,
        required: true
    },
    endurance: {
        type: Number,
        default: 20,
        required: true
    },
    exercises: [{
        name: {
            type: String,
            required: true,
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
        exercise: {
            type: mongoose.Types.ObjectId,
            ref: "Exercise",
            required: true,
        },
        progress: {
            type: Number,
            default: 0,
            required: true
        },
        exercise_level: {
            type: Number,
            default: 1,
            required: true
        },
        exercise_type: {
            type: mongoose.Types.ObjectId,
            ref: "ExerciseType",
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
        superSkill: {
            type: String,
            default: 'none',
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
    }]
})

// userSchema.plugin(encrypt, { 
//     secret: 'your-secret-key',  
//     encryptedFields: ['password']
// });



export default mongoose.model("User", userSchema)
