import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
    makepayment, 
    getsubs, 
    deletesub, 
    updatesub, 
    payhere,
    freetrial 
} from '../controllers/sub.controller.js';

const router = express.Router();

router.post('/makepayment', makepayment);
router.post('/payhere', payhere);
router.get('/getsubs', getsubs);
router.delete('/deletesub/:subId', verifyToken, deletesub);
router.put('/updatesub/:subId', verifyToken, updatesub);
router.post('/freetrial', freetrial);


export default router;