import config = require("./utils/config");
import blogRouter = require("./controllers/blogs");
import express = require("express");
import cors = require("cors");
import mongoose = require("mongoose");

const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

export = app;