import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db.js';
import cors from 'cors';

//importing routes starts from here
import authRoute from './routes/authRoute.js';

//admin routes starts from here
import adminUserRoute from './admin-routes/users/adminUserRoute.js';

const app = express();
app.use(express.json());

app.use(cors());

dotenv.config();
connectDb();

//admin routes
app.use('/admin/users', adminUserRoute);

//route for user login & registration
app.use('/api/auth', authRoute);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on Port: ${port}`));
