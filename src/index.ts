import express, {Request, Response} from "express";
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/MyUserRoutes';
import {v2 as cloudinary} from 'cloudinary';
import myRestaurantRoute from './routes/MyRestaurantRoute';
import RestaurantRoute from './routes/RestaurantRoute';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log('Connected to database'));
const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', async (req: Request, res: Response) => {
    res.send({message: 'Health OK!'});
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/restaurant', RestaurantRoute)
app.listen(3000, () => {
    console.log("server Started")
});