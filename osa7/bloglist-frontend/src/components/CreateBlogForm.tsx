import { FormEvent } from "react";
import { useAppDispatch } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";
import useField from "../hooks/useField";

interface NewBlog {
    title: string;
    author: string;
    url: string;
}

const CreateBlogForm = () => {
    const { reset: resetTitle, ...title } = useField("text");
    const { reset: resetAuthor, ...author } = useField("text");
    const { reset: resetUrl, ...url } = useField("text");

    const dispatch = useAppDispatch();

    const handleCreateBlog = async (event: FormEvent) => {
        event.preventDefault();

        dispatch(
            createBlog({
                title: title.value,
                author: author.value,
                url: url.value,
            }),
        );

        dispatch(
            setNotification(`Added new blog ${title.value} by ${author.value}`),
        );

        handleReset();
    };

    const handleReset = () => {
        resetTitle();
        resetAuthor();
        resetUrl();
    };

    return (
        <Togglable buttonLabel="new blog">
            <div>
                <h2>create new</h2>
                <form onSubmit={handleCreateBlog}>
                    <div>
                        title: <input id="title-input" {...title} />
                    </div>
                    <div>
                        author: <input id="author-input" {...author} />
                    </div>
                    <div>
                        url: <input id="url-input" {...url} />
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
