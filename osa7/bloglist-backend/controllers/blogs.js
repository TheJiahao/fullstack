const router = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const logger = require("../utils/logger");

const { userExtractor } = require("../utils/middleware");

router.get("/", async (request, response) => {
    const blogs = await Blog.find({})
        .populate("user", {
            username: 1,
            name: 1,
        })
        .populate("comments", {
            content: 1,
        });

    response.json(blogs);
});

router.post("/", userExtractor, async (request, response) => {
    const { title, author, url, likes } = request.body;
    const blog = new Blog({
        title,
        author,
        url,
        likes: likes ? likes : 0,
    });

    const user = request.user;

    if (!user) {
        return response.status(401).json({ error: "operation not permitted" });
    }

    blog.user = user._id;

    const createdBlog = await (
        await blog.save()
    ).populate("user", {
        username: 1,
        name: 1,
    });

    logger.info("Created blog", createdBlog);

    user.blogs = user.blogs.concat(createdBlog._id);
    await user.save();

    response.status(201).json(createdBlog);
});

router.put("/:id", async (request, response) => {
    const { title, url, author, likes } = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, url, author, likes },
        { new: true },
    ).populate("user", {
        username: 1,
        name: 1,
    });

    response.json(updatedBlog);
});

router.delete("/:id", userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    const user = request.user;

    if (!user || blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: "operation not permitted" });
    }

    user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());

    await user.save();
    await blog.remove();

    response.status(204).end();
});

router.post("/:id/comments", async (request, response) => {
    const { content } = request.body;
    const blogId = request.params.id;
    const comment = new Comment({
        content,
    });

    comment.blog = blogId;

    const savedComment = await (
        await comment.save()
    ).populate("blog", { id: 1 });

    const blog = await Blog.findById(blogId);
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();

    response.status(201).json(savedComment);
});

module.exports = router;
