import Workout from '../models/workoutModel.js';
import mongoose from 'mongoose';

// add a new workout
export const createWorkout = async (req, res) => {
	const { title, reps, load } = req.body;

	let emptyFields = [];

	if (!title) {
		emptyFields.push('title');
	}
	if (!load) {
		emptyFields.push('load');
	}
	if (!reps) {
		emptyFields.push('reps');
	}
	if (emptyFields.length > 0) {
		return res.status(400).json({ error: 'Please fill all the fields', emptyFields });
	}

	try {
		const user_id = req.user._id;
		const workout = await Workout.create({ title, load, reps, user_id });
		res.status(200).json(workout);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

// get all workouts
export const getWorkouts = async (req, res) => {
	const user_id = req.user._id;
	try {
		const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
		res.json(workouts);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'No such workouts'
		});
	}
}

// get a single workout
export const getWorkout = async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such workout' });
		}

		const workout = await Workout.findById(id);

		if (!workout) {
			return res.status(404).json({ error: 'No such workout' });
		}

		res.json(workout);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'No such workout'
		});
	}
}

// update a workout
export const updateWorkout = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such workout' });
		}
		const workout = await Workout.findOneAndUpdate({_id: id}, { ...req.body });

		if (!workout) {
			return res.status(404).json({ error: 'No such workout' });
		}
		res.status(200).json(workout);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Don't update a workout :("
		});
	}
}

// delete a workout
export const deleteWorkout = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such workout' });
		}
		const workout = await Workout.findOneAndDelete({_id: id});

		if (!workout) {
			return res.status(404).json({ error: 'No such workout' });
		}

		res.status(200).json(workout);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Don't delete a workout :("
		});
	}
}
