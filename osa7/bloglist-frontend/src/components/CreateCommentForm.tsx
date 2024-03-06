import { FormEvent } from "react";
import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import useField from "../hooks/useField";
import { commentBlog } from "../reducers/blogReducer";
import logger from "../utils/logger";

const CreateCommentForm = () => {
    const match = useMatch("/blogs/:id");
    const dispatch = useAppDispatch();

    const { reset: resetComment, ...comment } = useField("text");
    const blogs = useAppSelector((state) => state.blogs);

    const blog = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null;

    if (!blog) {
        logger.error("CreateCommentForm should be inside Blog component");
        return null;
    }

    const handleComment = (event: FormEvent) => {
        event.preventDefault();

        dispatch(commentBlog({ blogId: blog.id, content: comment.value }));

        resetComment();
    };

    return (
        <form onSubmit={handleComment}>
            <input {...comment} />
            <button type="submit">add comment</button>
        </form>
    );
};

export default CreateCommentForm;
