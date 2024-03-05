import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { BlogProps } from "../components/Blog";
import { NewBlog } from "../components/CreateBlogForm";
import blogService from "../services/blog_service";
import logger from "../utils/logger";
import { notificationHandler } from "./handle_notification";

const createBlog =
    (
        blogs: BlogProps[],
        setBlogs: Dispatch<SetStateAction<BlogProps[]>>,
        handleNotification: notificationHandler,
        visibilityRef: MutableRefObject<{ toggleVisibility: VoidFunction }>,
    ) =>
    async (newBlog: NewBlog) => {
        const blog = await blogService.create(newBlog);
        handleNotification(`Added new blog ${blog.title} by ${blog.author}`);
        logger.info("Added blog", blog);

        setBlogs(blogs.concat(blog));
        logger.info("Updated blog list");

        if (!visibilityRef.current) {
            logger.error("Toggle ref not initialized");
            return;
        }

        visibilityRef.current.toggleVisibility();
    };

export type { createBlog };
export default createBlog;
