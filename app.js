const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// Import Routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("db connected")
);

// Middleware
app.use(express.json());

// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/profile", profileRoute);

app.listen(3000, () => console.log(`Listening in port 3000...`));
