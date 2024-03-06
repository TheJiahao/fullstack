import { FormEvent } from "react";
import { useAppDispatch } from "../hooks";
import useField from "../hooks/useField";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import { Button, Form } from "react-bootstrap";

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
                <Form onSubmit={handleCreateBlog}>
                    <Form.Group controlId="title-input">
                        <Form.Label>title</Form.Label>
                        <Form.Control {...title} />
                    </Form.Group>

                    <Form.Group controlId="author-input">
                        <Form.Label>author</Form.Label>
                        <Form.Control {...author} />
                    </Form.Group>

                    <Form.Group controlId="url-input">
                        <Form.Label>url</Form.Label>
                        <Form.Control {...url} />
                    </Form.Group>

                    <Button id="create-button" type="submit">
                        create
                    </Button>
                </Form>
            </div>
        </Togglable>
    );
};

export type { NewBlog };
export default CreateBlogForm;
