import express from 'express'
import { getAllExercises, addExercise, getExercises, updateExercise, getById, deleteExercise } from '../controllers/exercise-controller.js'

const exerciseRouter = express.Router()

// router.post('/uploadExercisePhoto', handleUploadExercisePhoto, uploadExercisePhoto);

exerciseRouter.get("/", getAllExercises)
exerciseRouter.post("/gett", getExercises)
exerciseRouter.post("/add", addExercise)
exerciseRouter.put("/update/:id", updateExercise)
exerciseRouter.get("/:id", getById)
exerciseRouter.delete("/:id", deleteExercise)

export default exerciseRouter