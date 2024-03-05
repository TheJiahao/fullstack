import { Dispatch, SetStateAction } from "react";
import blogService from "../services/blog_service";
import logger from "../utils/logger";
import Blog, { BlogProps } from "./Blog";

const BlogList = ({
  blogs,
  setBlogs,
  username,
}: {
  blogs: BlogProps[];
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>;
  username: string;
}) => {
  const handleLike = (blog: BlogProps) => async () => {
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

  const handleDelete = (blog: BlogProps) => async () => {
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
