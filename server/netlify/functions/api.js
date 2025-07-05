//This file is needed for setting up the middleware with Netlify Functions
'use strict';

import express from 'express';
import ServerlessHttp from "serverless-http";
import dotenv from 'dotenv';
// Expand environment variables for nested variables
import dotenvExpand from "dotenv-expand";

import { initFirebaseFeedMeNow } from '../../controllers/sendFirestoreData.js';
import { loadData } from '../../controllers/databaseController.js';
/* Import routes */
//import usersRoutes from './routes/usersRoutes.js';
import recipesRoutes from "../../routes/recipesRoutes.js";

const envConfig = dotenv.config();

dotenvExpand.expand(envConfig);

const app = express();

const databasesInit = async () => {
    //Initializes Firestore Database
    await initFirebaseFeedMeNow();

    //load the data from the airtable base
    //exported variables should always be defined if read
    await loadData();
}

databasesInit();

// Default route
const homePage = (req,res) => {
    res.send('<h1 style="text-align:center">Welcome to FeedMeNow API server!</h1>');
}

app.get("/", homePage);
app.get('/api/', homePage);
app.get('/api/v1/', homePage);

// Use routes to handle user data
//app.use("/api/v1/users", usersRoutes);

// Route to manage invoking n8n workflow to recommend recipes, and getting other recipe related data
app.use("/api/v1/recipes", recipesRoutes);

export const handler = ServerlessHttp(app); // Export the Express app wrapped by serverless-http