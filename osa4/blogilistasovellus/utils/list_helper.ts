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

  const authors = blogs.map((blog) => blog.author);
  const authorsByBlogs = _.countBy(blogs, "author");

  const authorWithMostBlogs = _.maxBy(
    authors,
    (author) => authorsByBlogs[author]
  );

  return {
    author: authorWithMostBlogs,
    blogs: authorsByBlogs[authorWithMostBlogs],
  };
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs };
