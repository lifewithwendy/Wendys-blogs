import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password || username ==='' || password ==='' || email ==='') {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashpassword = await bcryptjs.hash(password, 10);

    const newUser= new  User({ 
        username, 
        email, 
        password : hashpassword ,
    });
    try{
        await newUser.save();    
        res.json({ message: 'SignUp successfull' });

    }catch(error){
        next(error);
    }
    
}