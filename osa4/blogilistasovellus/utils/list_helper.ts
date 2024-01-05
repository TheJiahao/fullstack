import Blog from "../interfaces/blog";

const dummy = (blogs: Blog[]): number => {
  return 1;
};

const totalLikes = (blogs: Blog[]): number => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs: Blog[]): Blog | null => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

export default { dummy, totalLikes, favoriteBlog };
