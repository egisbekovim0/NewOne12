import express from 'express'
import { getAllMuscleTypes, addMuscleType ,updateMuscleType, getMuscleTypeById, deleteMuscleType } from '../controllers/muscle-type-controller.js'

const muscleTypeRouter = express.Router()
muscleTypeRouter.get("/", getAllMuscleTypes)
muscleTypeRouter.post("/add", addMuscleType)
muscleTypeRouter.put("/update/:id", updateMuscleType)
muscleTypeRouter.get("/:id", getMuscleTypeById)
muscleTypeRouter.delete("/:id", deleteMuscleType)

export default muscleTypeRouter