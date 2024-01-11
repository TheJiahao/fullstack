import { Dispatch, SetStateAction } from "react";
import Blog, { BlogProps } from "./Blog";
import User from "../interfaces/user";

const BlogList = ({
  blogs,
  setBlogs,
  username,
}: {
  blogs: BlogProps[];
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>;
  username: string;
}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          username={username}
        />
      ))}
    </div>
  );
};

export default BlogList;
