import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { BlogProps } from "./Blog";
import handleCreateBlog from "../handlers/handle_create_blog";
import { notificationHandler } from "../handlers/handle_notification";

const CreateBlogForm = ({
  blogs,
  setBlogs,
  handleNotification,
  visibilityRef,
}: {
  blogs: BlogProps[];
  setBlogs: Dispatch<SetStateAction<BlogProps[]>>;
  handleNotification: notificationHandler;
  visibilityRef: MutableRefObject<{ toggleVisibility: () => void }>;
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={handleCreateBlog(
          title,
          author,
          url,
          blogs,
          setTitle,
          setAuthor,
          setUrl,
          setBlogs,
          handleNotification,
          visibilityRef
        )}
      >
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
