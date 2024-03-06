import { useMatch } from "react-router-dom";
import useField from "../hooks/useField";
import { useAppSelector } from "../hooks";
import logger from "../utils/logger";

const CreateCommentForm = () => {
    const match = useMatch("/blogs/:id");
    const comment = useField("text");
    const blogs = useAppSelector((state) => state.blogs);

    const blogId = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null;

    if (!blogId) {
        logger.error("CreateCommentForm should be inside Blog component");
        return null;
    }

    return (
        <form>
            <input {...comment} />
            <button type="submit">add comment</button>
        </form>
    );
};

export default CreateCommentForm;
