import config = require("./utils/config");
import blogModel = require("./models/blog");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  blogModel.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new blogModel(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

export = app;
