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
    }  
}, { timestamps: true }); 

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

export default Advertisement;