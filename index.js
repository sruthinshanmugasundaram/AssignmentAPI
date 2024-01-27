const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors = require('cors');

dotenv.config();

// Middleware for handling unhandled errors
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Connect to MongoDB using promises
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successful");

    // Middleware to parse JSON requests
    app.use(express.json());
    const allowedOrigins = ['https://dynamic-pastelito-a75099.netlify.app'];

app.use(
  cors()
);

    // Routes
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/movies", movieRoute);
    app.use("/api/lists", listRoute);

    // Start the server
    const PORT = process.env.PORT || 8800;
    app.listen(PORT, () => {
      console.log(`Backend server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });
