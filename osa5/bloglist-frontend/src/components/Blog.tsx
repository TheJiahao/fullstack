import { Dispatch, SetStateAction, useState } from "react";
import User from "../interfaces/user";
import blogService from "../services/blog_service";
import logger from "../utils/logger";

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
  blogs,
  setBlogs,
  username,
}: {
  blog: BlogProps;
  blogs: BlogProps[];
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>;
  username: string;
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

  const handleLike = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };

    await blogService.update(newBlog);
    logger.info("Updated blog", newBlog);

    setBlogs(
      blogs
        .filter((currentBlog) => currentBlog.id !== blog.id)
        .concat(newBlog)
        .sort((a, b) => b.likes - a.likes)
    );
  };

  const handleDelete = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }

    await blogService.remove(blog.id);
    logger.info("Deleted blog", blog.id);

    setBlogs(
      blogs
        .filter((currentBlog) => currentBlog.id !== blog.id)
        .sort((a, b) => b.likes - a.likes)
    );
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setVisible(!visible)}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes} <button onClick={handleLike}>like</button>
        <br />
        {blog.user.name}
        <br />
        {username === blog.user.username && (
          <button onClick={handleDelete}>delete</button>
        )}
      </div>
    </div>
  );
};

export type { BlogProps };
export default Blog;
