import Blog from "../interfaces/blog";
import _ from "lodash";

interface BloggerWithBlogs {
  author: string;
  blogs: number;
}

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

const mostBlogs = (blogs: Blog[]): BloggerWithBlogs | null => {
  if (blogs.length === 0) {
    return null;
  }

  return _(blogs)
    .countBy("author")
    .toPairs()
    .map((pair) => {
      return { author: pair[0], blogs: pair[1] };
    })
    .maxBy("blogs");
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs };
