const express = require("express");

// CORS allows our frontend (React) and backend (Express) to talk to each other when running on different ports (like 3000 and 5000). Cross-Origin Resource Sharing.
const cors = require("cors");

//Loads variables from our .env file (like PORT, DATABASE_URL, JWT_SECRET)
require("dotenv").config();

// Loads our authentication routes (signup, login). This is where the POST /api/auth/signup and POST /api/auth/login live
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

//Mounts your auth routes. This means all routes inside authRoutes will start with "/api/auth". So "/signup" becomes "/api/auth/signup". “Hey Express! Any request that starts with /api/auth, go check inside authRoutes to handle it.”
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend app(Node.js-Express) is working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running om port ${PORT}`));
