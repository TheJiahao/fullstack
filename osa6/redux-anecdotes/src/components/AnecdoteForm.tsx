import { FormEventHandler } from "react";

const AnecdoteForm = ({
    addAnecdote,
}: {
    addAnecdote: FormEventHandler<HTMLFormElement>;
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
