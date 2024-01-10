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
  setTitle: Dispatch<SetStateAction<string>>,
  setAuthor: Dispatch<SetStateAction<string>>,
  setUrl: Dispatch<SetStateAction<string>>,
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>,
  handleNotification: notificationHandler
) => {
  return async (event: FormEvent) => {
    event.preventDefault();

    const blog = await blogService.create(title, author, url);
    handleNotification(`Added new blog ${blog.title} by ${blog.author}`);
    logger.info("Added blog", blog);

    setBlogs(blogs.concat(blog));
    logger.info("Updated blog list");

    setTitle("");
    setAuthor("");
    setUrl("");
  };
};

export default handleCreateBlog;
