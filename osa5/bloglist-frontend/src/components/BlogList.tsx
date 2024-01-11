import { Dispatch, SetStateAction } from "react";
import Blog, { BlogProps } from "./Blog";

const BlogList = ({
  blogs,
  setBlogs,
}: {
  blogs: BlogProps[];
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>;
}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      ))}
    </div>
  );
};

export default BlogList;
