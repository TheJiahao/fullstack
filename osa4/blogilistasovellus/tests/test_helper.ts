import Blog from "../interfaces/blog";
import blogModel from "../models/blog";

const getInitialBlogs: Blog[] = [
  {
    author: "Jaska Jokunen",
    title: "How to make a fusion power plant at home",
    url: "https://blog.test",
    likes: 1000000,
  },
  {
    author: "Blogger",
    title: "TypeScript is better than JavaScript",
    url: "https://blog.test/typescript",
    likes: 2,
  },
];

const getNonExistingId = async () => {
  const blog = new blogModel({ author: "", title: "", url: "", likes: 0 });
  await blog.save();

  await blogModel.findByIdAndDelete(blog.id);

  return blog.id;
};

const getAllBlogs = async () => {
  return blogModel.find({});
};

export default { getInitialBlogs, getAllBlogs, getNonExistingId };
