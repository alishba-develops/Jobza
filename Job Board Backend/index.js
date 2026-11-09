const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const router = require("./Routes/Jobseekerroutes.js");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
app.use(express.json({limit:"10mb"}));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// To listen Port
app.listen(port, () => {
  console.log("port is connected at:", port);
});

// DB connection
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("DB connected");
});

app.use("/", router);
