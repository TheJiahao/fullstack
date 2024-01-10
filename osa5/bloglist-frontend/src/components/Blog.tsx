interface BlogProps {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
}

const Blog = ({ blog }: { blog: BlogProps }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export type { BlogProps };
export default Blog;
