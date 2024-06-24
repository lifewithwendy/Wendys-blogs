import express from 'express';
import { google,signup,signin } from '../controllers/auth.controller.js';
import { freetrial } from '../controllers/sub.controller.js';

const router = express.Router();	

router.post('/signup', signup, freetrial);
router.post('/signin', signin);
router.post('/google', google );

export default router;