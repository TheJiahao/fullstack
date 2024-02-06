import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../services/notificationService";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const addAnecdote = (event: FormEvent) => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        dispatch(createAnecdote(content));
        showNotification(`Added anecdote "${content}"`);
    };

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
