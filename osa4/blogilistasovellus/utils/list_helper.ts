import Blog from "../interfaces/blog";

const dummy = (blogs: Blog[]): number => {
  return 1;
};

const totalLikes = (blogs: Blog[]): number => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

export default { dummy, totalLikes };
