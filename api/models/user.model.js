import mongoose from "mongoose";

const userSchema = new mongoose.Schema({   
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://th.bing.com/th/id/R.f038b95defb4b72e7c7f35c8764ff639?rik=LXDhoT%2fDCX4CWQ&pid=ImgRaw&r=0",
    },
},
{timestamps: true}//saving time of creation and update
);

const User = mongoose.model('User', userSchema);

export default User;