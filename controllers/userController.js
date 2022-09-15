import User from '../models/userModel.js';
import mongoose from 'mongoose';

export const loginUser = async (req, res) => {
  res.json({ msg: 'login user' });
}

export const signupUser = async (req, res) => {
  res.json({ msg: 'signup user' });
}