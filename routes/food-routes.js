import express from 'express';
import { getFood } from '../controllers/food-controller.js';

const foodRouter = express.Router()

foodRouter.get('/', getFood);

export default foodRouter