import express from 'express';
import { login, signup, logout, onboard } from '../controllers/auth.controller.js'; // Importing the login controller
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();    

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

router.post('/onboarding', protectRoute ,onboard);


//checks if the user is logged in or not
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
})

export default router;