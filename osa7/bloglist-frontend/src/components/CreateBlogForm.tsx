import { FormEvent, useState } from "react";

interface NewBlog {
  title: string;
  author: string;
  url: string;
}

interface BlogCreator {
  (newBlog: NewBlog): Promise<void>;
}

const CreateBlogForm = ({ createBlog }: { createBlog: BlogCreator }) => {
  const [newBlog, setNewBlog] = useState<NewBlog>({
    title: "",
    author: "",
    url: "",
  });

  const handleCreateBlog = async (event: FormEvent) => {
    event.preventDefault();

    await createBlog(newBlog);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:{" "}
          <input
            id="title-input"
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
            id="author-input"
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
            id="url-input"
            type="text"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export type { NewBlog };
export default CreateBlogForm;
