import express from 'express';
import { signup, signin, getProfile, signOut} from '../controllers/auth.controller.js';
import { authenticate } from '../../customer/src/middleware/auth.middleware.js';


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get('/profile', authenticate, getProfile);
router.post('/signout', signOut);

export default router;
