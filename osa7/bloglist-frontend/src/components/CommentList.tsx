import Comment from "../interfaces/comment";
import CreateCommentForm from "./CreateCommentForm";

const CommentList = ({ comments }: { comments: Comment[] }) => {
    return (
        <div>
            <h3>Comments</h3>
            <CreateCommentForm />
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
