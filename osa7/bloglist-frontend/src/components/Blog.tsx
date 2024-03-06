import { Button } from "react-bootstrap";
import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import Comment from "../interfaces/comment";
import User from "../interfaces/user";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import logger from "../utils/logger";
import CommentList from "./CommentList";

interface BlogProps {
    id: string;
    title: string;
    author: string;
    url: string;
    likes: number;
    user: User;
    comments: Comment[];
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
                <Button variant="success" className="like-button" onClick={handleLike}>
                    like
                </Button>
            </div>
            <div>{blog.user.name}</div>

            {currentUsername === blog.user.username && (
                <Button variant="danger" className="delete-blog-button" onClick={handleDelete}>
                    delete
                </Button>
            )}

            <CommentList comments={blog.comments} />
        </div>
    );
};

export type { BlogProps };
export default Blog;
