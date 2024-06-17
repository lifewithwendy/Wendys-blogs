import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getsubs, deletesub, updatesub } from '../controllers/sub.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getsubs', getsubs);
router.delete('/deletesub/:subId', verifyToken, deletesub);
router.put('/updatesub/:subId', verifyToken, updatesub)

export default router;