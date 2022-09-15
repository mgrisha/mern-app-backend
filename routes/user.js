import express from 'express';
import { loginUser, signupUser } from '../controllers/userController.js';

const router = express.Router();

// login user
router.post('/login', loginUser);

// signup user
router.post('/signup', signupUser);

export default router;
