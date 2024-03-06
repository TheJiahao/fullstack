import { FormEvent, useState } from "react";
import { useAppDispatch } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";

interface NewBlog {
    title: string;
    author: string;
    url: string;
}

const CreateBlogForm = () => {
    const [newBlog, setNewBlog] = useState<NewBlog>({
        title: "",
        author: "",
        url: "",
    });
    const dispatch = useAppDispatch();

    const handleCreateBlog = async (event: FormEvent) => {
        event.preventDefault();

        dispatch(createBlog(newBlog));

        dispatch(
            setNotification(
                `Added new blog ${newBlog.title} by ${newBlog.author}`,
            ),
        );

        setNewBlog({ title: "", author: "", url: "" });
    };

    return (
        <Togglable buttonLabel="new blog">
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
        </Togglable>
    );
};

export type { NewBlog };
export default CreateBlogForm;
