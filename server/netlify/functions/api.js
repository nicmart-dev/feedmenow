//This file is needed for setting up the middleware with Netlify Functions
'use strict';

import express from 'express';
import ServerlessHttp from "serverless-http";
import dotenv from 'dotenv';
// Expand environment variables for nested variables
import dotenvExpand from "dotenv-expand";

import { loadData } from '../../controllers/databaseController.js';
/* Import routes */
//import usersRoutes from './routes/usersRoutes.js';
import recipesRoutes from "../../routes/recipesRoutes.js";
import cors from "cors";

const envConfig = dotenv.config();

dotenvExpand.expand(envConfig);

const databasesInit = async () => {
    //load the data from the airtable base
    //exported variables should always be defined if read
    await loadData();
}

databasesInit();

// Default route
const homePage = (req,res) => {
    res.send('<h1 style="text-align:center">Welcome to FeedMeNow API server!</h1>');
}

const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({
    origin: true
})); // allow any client to connect

app.get("/", homePage);
app.get('/api/', homePage);
app.get('/api/v1/', homePage);

// Use routes to handle user data
//app.use("/api/v1/users", usersRoutes);

// Route to manage invoking n8n workflow to recommend recipes, and getting other recipe related data
app.use("/api/v1/recipes", recipesRoutes);

export const handler = ServerlessHttp(app); // Export the Express app wrapped by serverless-http