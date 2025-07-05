'use strict';

import express from 'express';
import { initFirebaseFeedMeNow, initFirebasePortfolioSite } from './controllers/sendFirestoreData.js';
import dotenv from 'dotenv';
// Expand environment variables for nested variables
import dotenvExpand from "dotenv-expand";
import cors from 'cors';
import {loadData} from "./controllers/databaseController.js";
/* Import routes */
//import usersRoutes from './routes/usersRoutes.js';
import recipesRoutes from './routes/recipesRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

const envConfig = dotenv.config();

dotenvExpand.expand(envConfig);

const PORT = process.env.PORT || 5000; // Define the port number, use environment variable if available

const app = express();

const setupServer = async () => {
  app.use(express.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  app.use(cors({
    origin: true
  })); // allow any client to connect

  //Initializes Firestore Database
  await initFirebaseFeedMeNow();
  await initFirebasePortfolioSite();

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

  app.use("/api/v1/visit", portfolioRoutes);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

setupServer();
