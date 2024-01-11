import { useState } from "react";
import User from "../interfaces/user";

interface BlogProps {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: User;
}

const Blog = ({ blog }: { blog: BlogProps }) => {
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
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setVisible(!visible)}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes} <button>like</button>
        <br />
        {blog.user.name}
      </div>
    </div>
  );
};

export type { BlogProps };
export default Blog;
