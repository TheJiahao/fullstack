import { useState } from "react";
import { CreateBlogHandler } from "../handlers/handle_create_blog";

interface NewBlog {
  title: string;
  author: string;
  url: string;
}

const CreateBlogForm = ({
  handleCreateBlog,
}: {
  handleCreateBlog: CreateBlogHandler;
}) => {
  const [newBlog, setNewBlog] = useState<NewBlog>({
    title: "",
    author: "",
    url: "",
  });

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog(newBlog, setNewBlog)}>
        <div>
          title:{" "}
          <input
            type="text"
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export type { NewBlog };
export default CreateBlogForm;
