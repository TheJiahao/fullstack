import { Dispatch, FormEvent, SetStateAction } from "react";
import { BlogProps } from "../components/Blog";
import blogService from "../services/blog_service";
import logger from "../utils/logger";
import { notificationHandler } from "./handle_notification";

const handleCreateBlog = (
  title: string,
  author: string,
  url: string,
  blogs: BlogProps[],
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>,
  handleNotification: notificationHandler
) => {
  return async (event: FormEvent) => {
    event.preventDefault();

    console.log("")

    const blog = await blogService.create(title, author, url);
    handleNotification(`Added new blog ${blog.title} by ${blog.author}`);
    logger.info("Returned blog", blog);

    setBlogs(blogs.concat(blog));
    logger.info("Updated blog list");
  };
};

export default handleCreateBlog;
