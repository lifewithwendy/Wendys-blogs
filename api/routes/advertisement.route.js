import express from 'express';
import { 
    createAdvertisement, 
    getAdvertisements, 
    editAdvertisement, 
    deleteAdvertisement
} from '../controllers/advertisement.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createAdvertisement);
router.get('/getAds', verifyToken, getAdvertisements);
router.put('/editAd/:id', verifyToken, editAdvertisement);
router.delete('/deleteAd/:id', verifyToken, deleteAdvertisement);

export default router;