const express = require("express");
const app = express();
const connectDB = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
// load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const users = require("./routes/users");

// CORS configuration
const corsOptions = {
  origin: [
    "capacitor://localhost",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "file://",
    "https://user-management-two.onrender.com",
    "https://localhost", // <- ADD THIS LINE
    "http://localhost:3000",
    "https://user-management-fullstack-gamma.vercel.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// body parser
app.use(express.json());

// connect to database
connectDB();

app.use("/", users);
app.get("/", (req, res) => {
  console.log("I am inside homepage router");
  res.send("Hey Welcome here!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Application started running on ${PORT}`);
});
