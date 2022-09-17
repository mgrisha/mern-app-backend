import express from 'express';
// import Workout from '../models/workoutModel.js';
import { createWorkout, getWorkout, getWorkouts, updateWorkout, deleteWorkout } from '../controllers/workoutController.js';
import { requireAuth } from "../middleware/requireAuth.js";
// const express = require('express');
const router = express.Router();

//require auth for all workout routes
router.use(requireAuth);

//GET all workouts
router.get('/', getWorkouts);

//GET a single workout
router.get('/:id', getWorkout);

//POST a new workout
router.post('/', createWorkout);

//DELETE a workout
router.delete('/:id', deleteWorkout);

//UPDATE a workout
router.patch('/:id', updateWorkout);

// module.exports = router;
export default router;
