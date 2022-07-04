import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db.js';
import cors from 'cors';

//importing routes starts from here
import authRoute from './routes/authRoute.js';
import listingRoute from './routes/listingRoute.js';
import categoriesRoute from './routes/categoriesRoute.js';
import ratingRoute from './routes/ratingRoute.js';
import activitiesRoute from './routes/activitiesRoute.js';
import searchRoute from './routes/searchRoute.js';
import filterRoute from './routes/filterRoute.js';
import commentsRoute from './routes/commentsRoute.js';

//upload route
import uploadRoute from './routes/uploadRoute.js';

//admin routes starts from here
import adminUserRoute from './admin-routes/users/adminUserRoute.js';
import adminCategoryRoute from './admin-routes/categories/adminCategoryRoute.js';
import adminListingsRoute from './admin-routes/listings/adminListingsRoute.js';
import adminRatingsRoute from './admin-routes/listings/adminRatingsRoute.js';
import adminBadgesRoute from './admin-routes/badges/adminBadgesRoute.js';

const app = express();
app.use(express.json());

app.use(cors());

dotenv.config();
connectDb();

//upload route
app.use('/api/upload', uploadRoute);

//admin routes
app.use('/admin/users', adminUserRoute);
app.use('/admin/categories', adminCategoryRoute);
app.use('/admin/listings', adminListingsRoute);
app.use('/admin/ratings', adminRatingsRoute);
app.use('/admin/badges', adminBadgesRoute);

//route for user login & registration
app.use('/api/auth', authRoute);

//listing route
app.use('/api/listings', listingRoute);
app.use('/api/ratings', ratingRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/activities', activitiesRoute);
app.use('/api/search', searchRoute);
app.use('/api/filter', filterRoute);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on Port: ${port}`));
