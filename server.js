const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config(); // Call a Function called .config()
const cors = require("cors"); // Import the cors middleware
const port = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({extended: false}));

// Routes for goals and users
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
  );
} else {
  app.get("/", (req, res) =>
    res.send("Please set NODE_ENV to production in .env file")
  );
}

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
