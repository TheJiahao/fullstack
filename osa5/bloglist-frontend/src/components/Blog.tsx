import { MouseEventHandler, useState } from "react";
import User from "../interfaces/user";

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
  username,
  handleDelete,
  handleLike,
}: {
  blog: BlogProps;
  username: string;
  handleDelete: MouseEventHandler;
  handleLike: MouseEventHandler;
}) => {
  const [visible, setVisible] = useState(false);

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
        <button className="blog-detail-button" onClick={() => setVisible(!visible)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} id="blog-detail">
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes} <button className="like-button" onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          {username === blog.user.username && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export type { BlogProps };
export default Blog;
