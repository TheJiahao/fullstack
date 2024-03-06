import { useState } from "react";
import User from "../interfaces/user";
import { useAppDispatch, useAppSelector } from "../hooks";
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

const Blog = ({ blog }: { blog: BlogProps }) => {
    const dispatch = useAppDispatch();

    const [visible, setVisible] = useState(false);
    const currentUsername = useAppSelector(
        (state) => state.loggedUser?.username,
    );

    const showWhenVisible = { display: visible ? "" : "none" };
    const buttonLabel = visible ? "hide" : "view";

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

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
        <div className="blog" style={blogStyle}>
            <div>
                {blog.title} {blog.author}{" "}
                <button
                    className="blog-detail-button"
                    onClick={() => setVisible(!visible)}
                >
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible} className="blog-detail">
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
                <div>
                    {currentUsername === blog.user.username && (
                        <button
                            className="delete-blog-button"
                            onClick={handleDelete}
                        >
                            delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export type { BlogProps };
export default Blog;
