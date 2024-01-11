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
}: {
  blog: BlogProps;
  blogs: BlogProps[];
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>;
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
      </div>
    </div>
  );
};

export type { BlogProps };
export default Blog;
