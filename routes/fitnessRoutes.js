import express from 'express';
import { getDailyCalorie, getBurnedCalorie } from '../controllers/fitnessController.js';
const fitnessRouter = express.Router()

fitnessRouter.get('/daily-calorie', getDailyCalorie);
fitnessRouter.get('/', getBurnedCalorie);

export default fitnessRouter