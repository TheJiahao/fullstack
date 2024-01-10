import { Dispatch, SetStateAction } from "react";
import { BlogProps } from "../components/Blog";
import blogService from "../services/blog_service";
import logger from "../utils/logger";

const handleCreateBlog = (
  title: string,
  author: string,
  url: string,
  blogs: BlogProps[],
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>
) => {
  return async () => {
    const blog = await blogService.create(title, author, url);
    logger.info("Returned blog", blog);

    setBlogs(blogs.concat(blog));
    logger.info("Updated blog list");
  };
};

export default handleCreateBlog;
