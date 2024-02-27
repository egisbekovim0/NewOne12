import express from 'express'
import { getAllEnemies, fetchForEnemies, addEnemy, updateEnemy, getById, deleteEnemy } from '../controllers/enemy-controller.js'

const enemyRouter = express.Router()

enemyRouter.get("/", getAllEnemies)
enemyRouter.post("/add", addEnemy)
enemyRouter.post("/fetchAllEnemies", fetchForEnemies )
enemyRouter.put("/update/:id", updateEnemy)
enemyRouter.get("/:id", getById)
enemyRouter.delete("/:id", deleteEnemy)

export default enemyRouter