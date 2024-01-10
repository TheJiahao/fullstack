import Blog, { BlogProps } from "./Blog";

const BlogList = ({ blogs }: { blogs: BlogProps[] }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default BlogList;
