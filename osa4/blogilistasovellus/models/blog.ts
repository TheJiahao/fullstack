import mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true,
  },
  author: String,
  url: { type: String, minlength: 1, required: true },
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export = mongoose.model("Blog", blogSchema);
