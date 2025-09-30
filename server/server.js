'use strict';

import express from 'express';

const app = express();

// load environment variables from a .env file into process.env
import dotenv from 'dotenv';
const envConfig = dotenv.config();

// Expand environment variables for nested variables
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(envConfig);

const PORT = process.env.PORT || 5000; // Define the port number, use environment variable if available

import cors from 'cors';
import {loadData} from "./controllers/databaseController.js";

/* Import routes */
//import usersRoutes from './routes/usersRoutes.js';
import recipesRoutes from './routes/recipesRoutes.js';

const setupServer = async () => {
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    app.use(cors({
        origin: true
    })); // allow any client to connect

    //load the data from the airtable base
    //exported variables should always be defined if read
    await loadData();

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

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

setupServer();