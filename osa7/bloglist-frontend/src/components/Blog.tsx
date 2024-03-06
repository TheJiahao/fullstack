import { MouseEventHandler, useState } from "react";
import User from "../interfaces/user";
import { useAppSelector } from "../hooks";

interface BlogProps {
    id: string;
    title: string;
    author: string;
    url: string;
    likes: number;
    user: User;
}

const Blog = ({
    blog,
    handleDelete,
    handleLike,
}: {
    blog: BlogProps;
    handleDelete: MouseEventHandler;
    handleLike: MouseEventHandler;
}) => {
    const [visible, setVisible] = useState(false);
    const currentUsername = useAppSelector((state) => state.loggedUser?.username);

    const showWhenVisible = { display: visible ? "" : "none" };
    const buttonLabel = visible ? "hide" : "view";

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
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
