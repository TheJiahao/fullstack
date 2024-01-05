import Blog from "../interfaces/blog";
import _ from "lodash";

interface BloggerWithBlogs {
  author: string;
  blogs: number;
}

interface BloggerWithLikes {
  author: string;
  likes: number;
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

const mostLikes = (blogs: Blog[]): BloggerWithLikes | null => {
  if (blogs.length === 0) {
    return null;
  }

  return _(blogs)
    .groupBy("author")
    .mapValues((blogList) => _(blogList).map("likes").sum())
    .toPairs()
    .map((pair) => {
      return { author: pair[0], likes: pair[1] };
    })
    .maxBy("likes");
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
