const express = require("express");
const app = express();

// load environment variables from a .env file into process.env
const dotenv = require("dotenv");
const path = require("path");
const envConfig = dotenv.config();

// Expand environment variables for nested variables
const dotenvExpand = require("dotenv-expand");
dotenvExpand.expand(envConfig);

const PORT = process.env.PORT || 5000; // Define the port number, use environment variable if available

const cors = require("cors");

/* Import routes */
const usersRoutes = require(path.join(__dirname, "./routes/usersRoutes"));
const recipesRoutes = require('./routes/recipesRoutes');

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // allow * / all to access our api. All domains, ips, ports

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to FeedMeNow! API server!");
});

// Use routes to handle user data
app.use("/api/users", usersRoutes);

// Route to manage Google calendar user data handling
app.use('/api/recipes', recipesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
