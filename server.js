const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config(); // Call a Function called .config()
const port = process.env.PORT || 5000; // Its the Port, We Want our Server to Run on
const {errorHandler} = require("./middleware/errorMiddleware"); // If you don't want to use TRY CATCH and Just use ERROR HANDLER WE use a package called EXPRESS ASYNC HANDLER
const connectDB = require("./config/db");

connectDB();

const app = express(); // We Need to Initialize the Express, [Create a Variable and set that to express()]
app.use(express.json());

// express.urlencoded built-in middleware function in Express.
// https://www.geeksforgeeks.org/express-js-express-urlencoded-function/
app.use(express.urlencoded({extended: false}));

// "/api/goals"   is a End Point We need to put http://localhost:5000/api/goals  in Postman to check its Working or not [We can Change it]
app.use("/api/goals", require("./routes/goalRoutes")); // .get is the Request we wanna Listen For     // Endpoints will be /api/goals
app.use("/api/users", require("./routes/userRoutes"));

// Serve Front-End
if (process.env.NODE_ENV === "production") {
  // This comes near Last Steps
  app.use(express.static(path.join(__dirname, "../frontend/build"))); // Its gonna be our Static Folder  // Thats where react build out the static Assests
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", index.html)
    )
  );
} else {
  app.get("/", (req, res) =>
    res.send("Please set NODE_ENV to production in .env file")
  );
}
app.use(errorHandler); //  This will OverWrite the Default Express Error Handler

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
