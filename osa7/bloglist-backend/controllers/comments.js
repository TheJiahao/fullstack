const router = require("express").Router();
const Comment = require("../models/comment");

router.get("/", async (request, response) => {
    const blogs = await Comment.find({});

    response.json(blogs);
});

module.exports = router;
