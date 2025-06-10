const express = require("express");
const app = express();

// load environment variables from a .env file into process.env
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const { initFirebaseFeedMeNow, initFirebasePortfolioSite } = require("./controllers/sendFirestoreData");

const initDatabases = async () => {
  //Initializes Firestore Database
  await initFirebaseFeedMeNow();
  await initFirebasePortfolioSite();
}

const envConfig = dotenv.config();

// Expand environment variables for nested variables
const dotenvExpand = require("dotenv-expand");

dotenvExpand.expand(envConfig);

const PORT = process.env.PORT || 5000; // Define the port number, use environment variable if available

/* Import routes */
//const usersRoutes = require(path.join(__dirname, "./routes/usersRoutes"));
const recipesRoutes = require(path.join(__dirname, "./routes/recipesRoutes"));
const portfolioRoutes = require(path.join(__dirname, "./routes/portfolioRoutes"));

initDatabases();
const {loadData} = require("./controllers/databaseController");

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({
  origin: `${process.env.CLIENT_URL}`
})); // allow * / all to access our api. All domains, ips, ports
app.set('trust proxy', true);


const setupServer = async () => {
  // Middleware
  app.use(express.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  app.use(cors({
    origin: true
  })); // allow any client to connect

  //load the data from the airtable base
  //exported variables should always be defined if read
  await loadData();

  // Default route
  app.get("/", (req, res) => {
    res.send("Welcome to FeedMeNow API server!");
  });

  // Use routes to handle user data
  //app.use("/api/users", usersRoutes);

  // Route to manage invoking n8n workflow to recommend recipes, and getting other recipe related data
  app.use("/api/recipes", recipesRoutes);

app.use("/api/visit", portfolioRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

setupServer();
