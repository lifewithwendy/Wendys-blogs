import Advertisement from "../models/advertisement.model.js";
import { errorHandler } from "../utils/error.js";

export const createAdvertisement = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a Advertisement'));
    }
    if (!req.body.image || !req.body.title || !req.body.link) {
        return next(errorHandler(400, 'title, image and link, are required'));
    }
    try {
        const { title, image, link, type, priority } = req.body;     
        const newAdvertisement = new Advertisement({
            ...req.body,
            title,
            image,
            link,
            type,
            priority,
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
    if(!req.user.isAdmin){
        next(errorHandler(403, 'You are not authorized to view advertisments'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;
        const ads = await Advertisement.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalAds = await Advertisement.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        const lastMonthAds = await Advertisement.countDocuments({ createdAt: {$gte: oneMonthAgo}});

        res
            .status(200)
            .json({ ads, totalAds, lastMonthAds });
    } catch (error) {
        next(error);
    }
}

export const getAdToUpdate = async (req, res, next) => {
    try {
        const ad = await Advertisement.findById(req.params.id);
        if (!ad) {
            return next(errorHandler(404, 'Advertisement not found'));
        }
        res
            .status(200)
            .json(ad);
    } catch (error) {
        next(error.message);
    }

}

export const editAdvertisement = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
        const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
            req.params.id,
            { $set: {
                title: req.body.title,
                image: req.body.image,
                link: req.body.link,
                type: req.body.type,
                priority: req.body.priority,
                }
             },
            { new: true }
        );
        res
            .status(200)
            .json(updatedAdvertisement);
    } catch (error) {
        next(error)
    }
}

export const deleteAdvertisement = async (req, res, next) => {
    try {
        const ad = await Advertisement.findById(req.params.id);
        if (!ad) {
          return next(errorHandler(404, 'Advertisement not found'));
        }
        if (!req.user.isAdmin) {
          return next(errorHandler(403, 'You are not allowed to delete this Advertisement'));
        }
        await Advertisement.findByIdAndDelete(req.params.Id);
        res
            .status(200)
            .json('Advertisement has been deleted');
      } catch (error) {
        next(error);
      }
}

