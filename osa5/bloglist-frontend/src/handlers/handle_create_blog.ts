import {
  Dispatch,
  FormEvent,
  FormEventHandler,
  MutableRefObject,
  SetStateAction,
} from "react";
import { BlogProps } from "../components/Blog";
import blogService from "../services/blog_service";
import logger from "../utils/logger";
import { notificationHandler } from "./handle_notification";
import { NewBlog } from "../components/CreateBlogForm";
interface CreateBlogHandler {
  (
    newBlog: NewBlog,
    setNewBlog: Dispatch<SetStateAction<NewBlog>>
  ): FormEventHandler;
}
const handleCreateBlog =
  (
    blogs: BlogProps[],
    setBlogs: Dispatch<SetStateAction<BlogProps[]>>,
    handleNotification: notificationHandler,
    visibilityRef: MutableRefObject<{ toggleVisibility: VoidFunction }>
  ): CreateBlogHandler =>
  (newBlog, setNewBlog) =>
  async (event: FormEvent) => {
    event.preventDefault();

    const blog = await blogService.create(newBlog);
    handleNotification(`Added new blog ${blog.title} by ${blog.author}`);
    logger.info("Added blog", blog);

    setBlogs(blogs.concat(blog));
    logger.info("Updated blog list");

    setNewBlog({ title: "", author: "", url: "" });

    if (!visibilityRef.current) {
      logger.error("Toggle ref not initialized");
      return;
    }

    visibilityRef.current.toggleVisibility();
  };

export type { CreateBlogHandler };
export default handleCreateBlog;
