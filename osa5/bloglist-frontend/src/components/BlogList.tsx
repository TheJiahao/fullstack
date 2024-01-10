import Blog, { BlogProps } from "./Blog";

const BlogList = ({ blogs }: { blogs: BlogProps[] }) => (
  <div>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default BlogList;
