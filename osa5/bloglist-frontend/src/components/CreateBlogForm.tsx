import { Dispatch, SetStateAction, useState } from "react";
import { BlogProps } from "./Blog";
import handleCreateBlog from "../handlers/handle_create_blog";

const CreateBlogForm = ({
  blogs,
  setBlogs,
}: {
  blogs: BlogProps[];
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>;
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog(title, author, url, blogs, setBlogs)}>
        <div>
          title:{" "}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>{" "}
        <div>
          author:{" "}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>{" "}
        <div>
          url:{" "}
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
