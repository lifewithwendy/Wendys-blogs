import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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
};


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email ==='' || password ==='') {    
        next(errorHandler(400, 'User not found'));
    }

    try {
        const validUser = await User.findOne({email});
        if (!validUser ) {
             return next(errorHandler(404, 'User not found'));//better to have wrong credentials for security purposes
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign({ email: validUser.email, id: validUser._id }, process.env.JWT_SECRET,);// { expiresIn: '1h' });
        const { password: pass, ...rest } = validUser._doc;

        res
            .status(200)
            .cookie('acces_token', token, {
                 httpOnly: true })
            .json({rest});
    } catch (error) {
        next(error); 
    }
};