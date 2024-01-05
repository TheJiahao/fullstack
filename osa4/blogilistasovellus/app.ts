import config = require("./utils/config");
import blogRouter = require("./controllers/blogs");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

export = app;
