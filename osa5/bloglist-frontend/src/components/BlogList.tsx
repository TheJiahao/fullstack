import { Dispatch, SetStateAction } from "react";
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
