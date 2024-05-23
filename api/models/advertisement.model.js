import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "none",
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    views: {
        type: Array,
        default: []
    },
    link: {
        type: String,
        required: true,
    },  
    type: {
        type: String,
        default: "portrait", // lanscape, portrait, square
    },
    priority: {
        type: Number,
        default: 1, // 1,2,3
    },
}, { timestamps: true }); 

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

export default Advertisement;