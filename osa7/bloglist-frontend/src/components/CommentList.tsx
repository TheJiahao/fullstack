import Comment from "../interfaces/comment";

const CommentList = ({ comments }: { comments: Comment[] }) => {
    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
