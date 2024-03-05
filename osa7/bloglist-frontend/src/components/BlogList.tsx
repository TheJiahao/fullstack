import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import logger from "../utils/logger";
import Blog, { BlogProps } from "./Blog";

const BlogList = ({ username }: { username: string }) => {
    const blogs = useAppSelector((state) => state.blogs);

    const dispatch = useAppDispatch();

    const handleLike = (id: string) => async () => {
        dispatch(likeBlog(id));
        logger.info("Liked blog", id);
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
                    handleLike={handleLike(blog.id)}
                />
            ))}
        </div>
    );
};

export default BlogList;
