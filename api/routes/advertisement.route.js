import express from 'express';
import { 
    createAdvertisement, 
    getAdvertisements, 
    editAdvertisement, 
    deleteAdvertisement,
    getAdToUpdate,
    getAdToShow
} from '../controllers/advertisement.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createAdvertisement);
router.get('/getAds', verifyToken, getAdvertisements);
router.get('/getAdToUpdate/:id', verifyToken, getAdToUpdate);
router.put('/updateAd/:id', verifyToken, editAdvertisement);
router.delete('/deleteAd/:id', verifyToken, deleteAdvertisement);
router.get('/getAdToShow',  getAdToShow);

export default router;