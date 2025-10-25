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
app.use(
  cors({
    origin: [
      "capacitor://localhost",
      "http://localhost",
      "http://localhost:8080",
      "http://localhost:5173",
      "file://",
      "https://user-management-two.onrender.com", // ADD THIS LINE!
      "http://localhost:3000", // Just in case!
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
