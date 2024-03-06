import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import User from "../interfaces/user";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import logger from "../utils/logger";

interface BlogProps {
    id: string;
    title: string;
    author: string;
    url: string;
    likes: number;
    user: User;
}

const Blog = () => {
    const dispatch = useAppDispatch();
    const match = useMatch("/blogs/:id");

    const blogs = useAppSelector((state) => state.blogs);
    const currentUsername = useAppSelector(
        (state) => state.loggedUser?.username,
    );

    const blog = match
        ? (blogs.find((blog) => blog.id === match.params.id) as BlogProps)
        : null;

    if (!blog) {
        return null;
    }

    const handleLike = async () => {
        dispatch(likeBlog(blog.id));
        logger.info("Liked blog", blog.id);
    };

    const handleDelete = async () => {
        if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            return;
        }

        dispatch(deleteBlog(blog.id));
        logger.info("Deleted blog", blog.id);
    };

    return (
        <div>
            <h2>
                {blog.title} {blog.author}
            </h2>

            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                likes {blog.likes}{" "}
                <button className="like-button" onClick={handleLike}>
                    like
                </button>
            </div>
            <div>{blog.user.name}</div>

            {currentUsername === blog.user.username && (
                <button className="delete-blog-button" onClick={handleDelete}>
                    delete
                </button>
            )}
        </div>
    );
};

export type { BlogProps };
export default Blog;
