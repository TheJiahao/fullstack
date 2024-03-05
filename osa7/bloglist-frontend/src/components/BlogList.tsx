import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteBlog } from "../reducers/blogReducer";
import blogService from "../services/blog_service";
import logger from "../utils/logger";
import Blog, { BlogProps } from "./Blog";

const BlogList = ({ username }: { username: string }) => {
    const blogs = useAppSelector((state) => state.blogs);

    const dispatch = useAppDispatch();

    const handleLike = (blog: BlogProps) => async () => {
        const newBlog = { ...blog, likes: blog.likes + 1 };

        await blogService.update(newBlog);
        logger.info("Updated blog", newBlog);
    };

    const handleDelete = (blog: BlogProps) => async () => {
        if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            return;
        }

        dispatch(deleteBlog(blog.id));
        logger.info("Deleted blog", blog.id);
    };

    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    username={username}
                    handleDelete={handleDelete(blog)}
                    handleLike={handleLike(blog)}
                />
            ))}
        </div>
    );
};

export default BlogList;
