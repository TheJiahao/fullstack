import config = require("./utils/config");
import blogRouter = require("./controllers/blogs");
import userRouter from "./controllers/users";
import express = require("express");
import cors = require("cors");
import mongoose = require("mongoose");
import errorHandler from "./middlewares/errorHandler";

const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

export = app;
