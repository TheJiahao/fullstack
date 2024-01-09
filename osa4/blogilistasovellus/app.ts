import config = require("./utils/config");
import blogRouter = require("./controllers/blogs");
import loginRouter from "./controllers/login";
import userRouter from "./controllers/users";
import errorHandler from "./middlewares/errorHandler";
import express = require("express");
import cors = require("cors");
import mongoose = require("mongoose");

const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);

export = app;
