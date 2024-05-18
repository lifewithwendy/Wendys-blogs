import Advertisement from "../models/advertisement.model.js";
import { errorHandler } from "../utils/error.js";

export const createAdvertisement = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a Advertisement'));
    }
    if (!req.body.image) {
        return next(errorHandler(400, 'ID and iMAGE are required'));
    }
    try {
        const { title, image } = req.body;     
        const newAdvertisement = new Advertisement({
            ...req.body,
            title,
            image
        });
        await newAdvertisement.save();
        res
            .status(201)
            .json( newAdvertisement );
        // console.log(newAdvertisement);  
    } catch (error) {
        console.log(error);
        next(errorHandler(500, error.message));
    }
}

export const getAdvertisements = async (req, res, next) => {

}

export const editAdvertisement = async (req, res, next) => {

}

export const deleteAdvertisement = async (req, res, next) => {

}

