const express = require("express");
const app = express();
const connectDB = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
//load
dotenv.config();
const PORT = process.env.PORT || 3000;
const users = require("./routes/users");

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://user-management-fullstack-gamma.vercel.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//body parser
app.use(express.json());

//connect to database
connectDB();

app.use("/api", users);
app.get("/", (req, res) => {
  console.log("I am inside homepage router");
  res.send("Hey Welcome here!");
});

app.listen(PORT, () => {
  console.log(`Application started running on ${PORT}`);
});
