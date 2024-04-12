import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('mongoDB is connected');
}
).catch((err) => console.log('Error->' +err));

const app = express();
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

app.use('/api/user', userRoutes);//imports useroutes(the user) route file