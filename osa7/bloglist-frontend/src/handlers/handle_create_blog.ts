import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { BlogProps } from "../components/Blog";
import { NewBlog } from "../components/CreateBlogForm";
import blogService from "../services/blog_service";
import logger from "../utils/logger";

const createBlog =
    (
        blogs: BlogProps[],
        setBlogs: Dispatch<SetStateAction<BlogProps[]>>,
        visibilityRef: MutableRefObject<{ toggleVisibility: VoidFunction }>,
    ) =>
    async (newBlog: NewBlog) => {
        const blog = await blogService.create(newBlog);

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
