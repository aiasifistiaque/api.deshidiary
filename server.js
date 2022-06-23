import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db.js';

//importing routes starts from here
import testRoute from './routes/testRoute.js';

const app = express();

dotenv.config();
connectDb();

app.use('/api/test', testRoute);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on Port: ${port}`));
