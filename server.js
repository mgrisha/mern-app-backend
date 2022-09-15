import express from 'express';
import mongoose from 'mongoose';
import {} from 'dotenv/config';

import workoutRoutes from './routes/workouts.js';
import userRoutes from './routes/user.js';

// const express = require('express');
// const mongoose = require('mongoose');
// const workoutRoutes = require('./routes/workouts');
// require('dotenv').config();

// express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
});

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//connect to DB
// mongoose.connect('mongodb://localhost:27017/test');
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for request
		app.listen(process.env.PORT, () => {
			console.log('connected to DB & listening on port', process.env.PORT);
		});
	})
	.catch(error => {console.log(error)});
