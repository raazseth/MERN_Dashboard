const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const ATLAS_URI =
  "mongodb+srv://rodikal329:rodikal329@cluster1.y2uvelv.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.connect(ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established succesfully");
});

const userRouter = require("./Routes/userRouter");
const requestRouter = require("./Routes/requestRouter");

app.use("/api/", userRouter);
app.use("/api/", requestRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
